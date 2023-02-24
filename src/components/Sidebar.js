import React, {useEffect, useRef, useState} from "react";
import DashboardToggle from "./dashboard/DashboardToggle";
import CreateRoomModal from "./CreateRoomModal";
import {Divider} from "rsuite";
import ChatRoomList from "./ChatRoomList";


export default function Sidebar() {
    const topSidebarRef = useRef();
    const [height,setHeight]=useState(0)

    useEffect(()=>{

        if(topSidebarRef.current){
            setHeight(topSidebarRef.current.scrollHeight)
        }
    },[topSidebarRef])
    return <div className={"h-100 pt-2"}>

        <div ref={topSidebarRef}>
            <DashboardToggle/>
            <CreateRoomModal/>
            <Divider>Join Conversation</Divider>
        </div>

        <ChatRoomList aboveElHeight={height}/>
    </div>
}
