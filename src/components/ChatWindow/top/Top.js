import React, {memo} from "react";
import {useCurrentRoom} from "../../../context/current-room-context";
import {ButtonToolbar, Icon} from "rsuite";
import {Link} from "react-router-dom";
import {useMediaQuery} from "../../../helpers/custom-hooks";
import RoomInfoModal from "./RoomInfoModal";

function Top() {
    const name = useCurrentRoom(val => val.name)
    const isMobile = useMediaQuery('(max-width: 992px)')

    return <div>
        <div className={"d-flex justify-content-between align-items-center"}>
            <h4 className={"d-flex text-disappear align-items-center"}>
                <Icon className={isMobile ? 'd-inline-block p-0 mr-2 text-blue link-unstyled ' : 'd-none'}
                      componentClass={Link}
                      to={"/"}
                      size={"2x"}
                      icon={"arrow-circle-left"}/>
                <span className={"text-disappear"}>  {name}</span>
            </h4>

            <ButtonToolbar className={"ws-nowrap"}> todo </ButtonToolbar>
        </div>
        <div className={"d-flex justify-content-between align-items-center"}>
            <span>todo</span>
            <RoomInfoModal/>
        </div>
    </div>
}

export default memo(Top)