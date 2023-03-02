import React from "react";
import ProfileAvatar from "../../ProfileAvatar";
import TimeAgo from "timeago-react";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import PresenceDot from "../../PresenceDot";
import {Button} from "rsuite";


function MessageItem({message}) {

    const {author, createdAt, text} = message
    return <li>
        <div className={"d-flex align-items-center font-bolder mt-3"}>
            <PresenceDot uid={author.uid}/>
            <ProfileAvatar sec={author.avatar} name={author.name} className={"ml-1"} size={"xs"}/>
            <span className={"ml-2"}>{author.name}</span>

            <ProfileInfoBtnModal
                profile={author}
                appearance={"link"}
                className={"p-0 ml-1 text-black"}>
                <Button appearance={"primary"} color={"blue"} block onClick={""}>
                    
                </Button>
            </ProfileInfoBtnModal>
            <TimeAgo datetime={createdAt} className={"font-normal ml-2"}/>
        </div>
        <div>
            <span className={"word-break-all message-send"} >{text}</span>
        </div>
    </li>
}

export default MessageItem;