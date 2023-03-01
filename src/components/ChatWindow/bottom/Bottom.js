import React, {useCallback, useState} from "react";
import {Alert, Icon, Input, InputGroup} from "rsuite";
import firebase from "firebase/compat/app";
import {useParams} from "react-router";
import {useProfile} from "../../../context/profile.context";
import {database} from "../../../helpers/firebase";


function assembleMessage(profile, chatId) {
    return {
        roomId: chatId,
        author: {
            name: profile.name,
            uid: profile.uid,
            createdAt: profile.createdAt,
            ...(profile.avatar ? {avatar: profile.avatar} : {})
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP
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
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            onSendClick()
        }
    }
    return <div>
        <InputGroup>

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