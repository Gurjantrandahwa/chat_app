import React, {useCallback, useEffect, useState} from "react";
import MessageItem from "./MessageItem";
import {useParams} from "react-router";
import {auth, database} from "../../../helpers/firebase";
import {transformToArrayWithId} from "../../../helpers/helpers";
import {Alert} from "rsuite";


export default function Messages() {

    const {chatId} = useParams()
    const [messages, setMessages] = useState(null);

    const isChatEmpty = messages && messages.length === 0;
    const canShowMessages = messages && messages.length > 0;

    useEffect(() => {

        const messagesRef = database.ref('/messages');
        messagesRef.orderByChild('roomId').equalTo(chatId).on('value', (snap) => {

            const data = transformToArrayWithId(snap.val());
            setMessages(data)
        })

        return () => {
            messagesRef.off('value');
        }

    }, [chatId])

    const handleAdmin = useCallback(async (uid) => {
        const adminRef = database.ref(`/rooms/${chatId}/admins`)
        let alertMsg;
        await adminRef.transaction(admins => {
            if (admins) {
                if (admins[uid]) {
                    admins[uid] = null;
                    alertMsg = "Admin permission Removed"
                } else {
                    admins[uid] = true;
                    alertMsg = "Admin permission Granted"
                }
            }
            return admins
        })
        Alert.info(alertMsg, 4000)
    }, [chatId])

    const handleLike = useCallback(async (msgId) => {
        const {uid} = auth.currentUser;
        const messageRef = database.ref(`/messages/${msgId}`)

        let alertMsg;

        await messageRef.transaction(msg => {
            if (msg) {
                if (msg.likes && msg.likes[uid]) {

                    msg.likeCount -= 1;

                    msg[msgId] = null;
                    alertMsg = "Like Removed"
                } else {
                    msg.likeCount += 1;

                    if (!msg.likes){
                        msg.likes={};
                    }
                    msg.likes[uid] = true;
                    alertMsg = "Like added"
                }
            }
            return msg;
        });
        Alert.info(alertMsg, 4000)
    }, [])

    return <ul className={"msg-list custom-scroll"}>

        {isChatEmpty && <li>No Messages yet</li>}

        {canShowMessages && messages.map(msg => {
            return <MessageItem
                key={msg.id}
                message={msg}
                handleAdmin={handleAdmin}
                handleLike={handleLike}/>
        })}
    </ul>
}