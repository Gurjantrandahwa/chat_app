
import React from "react";
import DashboardToggle from "./dashboard/DashboardToggle";
import CreateRoomModal from "./CreateRoomModal";
import {Divider} from "rsuite";



export default function Sidebar() {

    return<div className={"h-100 pt-2"}>

        <div>
            <DashboardToggle/>
            <CreateRoomModal/>
            <Divider>Join Conversation</Divider>
        </div>

        bottom
    </div>
}
