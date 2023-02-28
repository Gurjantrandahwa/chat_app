import React from "react";
import Top from "../../components/ChatWindow/top/Top";
import Messages from "../../components/ChatWindow/messages/Messages";
import Bottom from "../../components/ChatWindow/bottom/Bottom";
import {useParams} from "react-router";
import {useRooms} from "../../context/room.context";
import {Loader} from "rsuite";
import {CurrentRoomProvider} from "../../context/current-room-context";

export default function Chat() {

    const {chatId} = useParams();
    const rooms = useRooms()

    if (!rooms) {
        return <Loader size={"md"} center vertical speed={"slow"} content={"Loading"}/>
    }

    const currentRoom = rooms.find(room => room.id === chatId)

    if (!currentRoom) {
        return <h6 className={"text-center mt-page"}>
            Chat {chatId} not found
        </h6>
    }
    const {name, description} = currentRoom;

    const currentRoomData = {
        name,
        description
    }
    return <CurrentRoomProvider data={currentRoomData}>
        <div className={"chat-top"}>
            <Top/>
        </div>
        <div className={"chat-middle"}>
            <Messages/>
        </div>

        <div className={"chat-bottom"}>
            <Bottom/>
        </div>


    </CurrentRoomProvider>
}
