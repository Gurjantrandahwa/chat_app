import React, {useCallback, useState} from "react";
import {Alert, Icon, Input, InputGroup} from "rsuite";
import firebase from "firebase/compat/app";
import {useParams} from "react-router";
import {useProfile} from "../../../context/profile.context";
import {database} from "../../../helpers/firebase";
import AttachmentModal from "./AttachmentModal";
import AudioMsgBtn from "./AudioMsgBtn";


function assembleMessage(profile, chatId) {
    return {
        roomId: chatId,
        author: {
            name: profile.name,
            uid: profile.uid,
            createdAt: profile.createdAt,
            ...(profile.avatar ? {avatar: profile.avatar} : {})
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        likeCount: 0
    }
}

export default function Bottom() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const {chatId} = useParams();
    const {profile} = useProfile();
    const onInputChange = useCallback((value) => {

        setInput(value)

    }, [])

    const onSendClick = async () => {
        if (input.trim() === '') {
            return
        }
        const msgData = assembleMessage(profile, chatId)
        msgData.text = input

        const updates = {};
        const messageId = database.ref('messages').push().key;
        updates[`/messages/${messageId}`] = msgData;
        updates[`/rooms/${chatId}/lastMessage`] = {
            ...msgData,
            msgId: messageId
        }
        setLoading(true)
        try {
            await database.ref().update(updates);
            setInput('')
            setLoading(false)
        } catch (e) {
            setLoading(false)
            Alert.error(e.message)
        }
    }

    const onKeyDown = async (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            await onSendClick()
        }
    }

    const afterUpload = useCallback(async (files) => {
        setLoading(true)
        const updates = {};
        files.forEach(file => {
            const msgData = assembleMessage(profile, chatId)
            msgData.file = file
            const messageId = database.ref('messages').push().key;
            updates[`/messages/${messageId}`] = msgData;
        })

        const lastMsgId = Object.keys(updates).pop();
        updates[`/rooms/${chatId}/lastMessage`] = {
            ...updates[lastMsgId],
            msgId: lastMsgId
        }
        try {
            await database.ref().update(updates);
            setLoading(false)
        } catch (e) {
            setLoading(false)
            Alert.error(e.message)
        }
    }, [chatId, profile])

    return <div>
        <InputGroup>
            <AttachmentModal afterUpload={afterUpload}/>
            <AudioMsgBtn afterUpload={afterUpload}/>

            <Input
                placeholder={"Write a new message here..."}
                value={input}
                onChange={onInputChange}
                type={"text"}
                disabled={loading}
                onKeyDown={onKeyDown}
            />

            <InputGroup.Button
                color={"blue"}
                appearance={"primary"}
                onClick={onSendClick}
            >
                <Icon icon={"send"}/>
            </InputGroup.Button>
        </InputGroup>
    </div>
}