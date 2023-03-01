import React from "react";
import TimeAgo from "timeago-react";
import ProfileAvatar from "./ProfileAvatar";


export default function RoomItem({room}) {
    const {createdAt, name, lastMessage} = room;
    return <div>

        <div className={"d-flex justify-content-between align-items-center"}>
            <h3 className={"text-disappear"}>{name}</h3>
            <TimeAgo datetime={lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)}/>

        </div>

        <div className={"d-flex align-items-center"}>
            {
                lastMessage ?
                    <>
                        <div className={"d-flex align-items-center"}>
                            <ProfileAvatar src={lastMessage.author.avatar} name={lastMessage.author.name} size={"sm"}/>
                        </div>
                        <div className={"text-disappear ml-2"}>
                            <div className={"italic"}>{lastMessage.author.name}</div>
                            <span>{lastMessage.text}</span>
                        </div>
                    </> :
                    <span>No Messages Yet...</span>
            }

        </div>
    </div>
}
