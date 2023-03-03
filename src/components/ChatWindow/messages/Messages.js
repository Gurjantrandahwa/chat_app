import React, {useCallback, useEffect, useRef, useState} from "react";
import MessageItem from "./MessageItem";
import {useParams} from "react-router";
import {auth, database, storage} from "../../../helpers/firebase";
import {groupBy, transformToArrayWithId} from "../../../helpers/helpers";
import {Alert, Button} from "rsuite";

const PAGE_SIZE = 15;
const messagesRef = database.ref('/messages');

function shouldScrollToBottom(node, threshold = 30) {
    const percent = (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;

    return percent > threshold
}

export default function Messages() {

    const {chatId} = useParams()
    const [messages, setMessages] = useState(null);
    const [limit, setLimit] = useState(PAGE_SIZE)
    const isChatEmpty = messages && messages.length === 0;
    const canShowMessages = messages && messages.length > 0;
    const selfRef = useRef();


    const loadMessages = useCallback((limitToLast) => {
        const node = selfRef.current;
        messagesRef.off();
        messagesRef.orderByChild('roomId')
            .equalTo(chatId)
            .limitToLast(limitToLast || PAGE_SIZE)
            .on('value', (snap) => {
                const data = transformToArrayWithId(snap.val());
                setMessages(data)

                if (shouldScrollToBottom(node)) {
                    node.scrollTop = node.scrollHeight;
                }

            })

        setLimit(prevState => prevState + PAGE_SIZE)

    }, [chatId])

    const onLoadMore = useCallback(() => {

        const node = selfRef.current;
        const oldHeight = node.scrollHeight;

        loadMessages(limit)

        setTimeout(() => {

            const newHeight = node.scrollHeight;
            node.scrollTop = newHeight - oldHeight
        }, 200)
    }, [loadMessages, limit])

    useEffect(() => {
        const node = selfRef.current;

        loadMessages()

        setTimeout(() => {
            node.scrollTop = node.scrollHeight;

        }, 200)
        return () => {
            messagesRef.off('value');
        }

    }, [loadMessages])

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
                    if (!msg.likes) {
                        msg.likes = {};
                    }
                    msg.likes[uid] = true;
                    alertMsg = "Like added"
                }
            }
            return msg;
        });
        Alert.info(alertMsg, 4000)
    }, [])

    const handleDelete = useCallback(async (msgId, file) => {
        if (!window.confirm("Delete this message ?")) {
            return;
        }
        const isLast = messages[messages.length - 1].id === msgId;
        const updates = {};
        updates[`/messages/${msgId}`] = null;

        if (isLast && messages.length > 1) {

            updates[`/rooms/${chatId}/lastMessage`] = {
                ...messages[messages.length - 2],
                msgId: messages[messages.length - 2].id
            }
        }

        if (isLast && messages.length === 1) {
            updates[`/rooms/${chatId}/lastMessage`] = null
        }

        try {
            await database.ref().update(updates)
            Alert.info("Message has been deleted")

        } catch (e) {
            return Alert.error(e.message)

        }

        if (file) {
            try {
                const fileRef = storage.refFromURL(file.url)
                await fileRef.delete()
            } catch (e) {
                Alert.error(e.message)
            }
        }
    }, [chatId, messages])

    const renderMessages = () => {

        const groups = groupBy(messages, (item) => new Date(item.createdAt).toDateString())
        const items = [];
        Object.keys(groups).forEach((date) => {
            items.push(
                <li key={date} className={"text-center mb-1 padded"}>
                    {date}
                </li>
            );
            const msgs = groups[date].map(msg => (
                <MessageItem
                    key={msg.id}
                    message={msg}
                    handleAdmin={handleAdmin}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                />
            ));
            items.push(...msgs)
        })
        return items;
    }
    return <ul ref={selfRef} className={"msg-list custom-scroll"}>
        {messages && messages.length >= PAGE_SIZE && (
            <li className={"text-center mt-2 mb-2"}>
                <Button
                    appearance={"primary"}
                    color={"green"}
                    onClick={onLoadMore}
                >
                    Load More
                </Button>
            </li>
        )}
        {isChatEmpty && <li>No Messages yet</li>}

        {canShowMessages && renderMessages()}
    </ul>
}