import React from "react";
import TimeAgo from "timeago-react";


export default function RoomItem({room}) {
    const {createdAt, name} = room;
    return <div>

        <div className={"d-flex justify-content-between align-items-center"}>
            <h3 className={"text-disappear"}>{name}</h3>
            <TimeAgo datetime={new Date(createdAt)}/>

        </div>

        <div className={"d-flex align-items-center"}>
    <span>
        No Messages Yet...
    </span>
        </div>
    </div>
}
