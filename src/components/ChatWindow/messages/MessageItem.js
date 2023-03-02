import React, {memo} from "react";
import ProfileAvatar from "../../ProfileAvatar";
import TimeAgo from "timeago-react";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import PresenceDot from "../../PresenceDot";
import {Button} from "rsuite";
import {useCurrentRoom} from "../../../context/current-room-context";
import {auth} from "../../../helpers/firebase";
import {useHover, useMediaQuery} from "../../../helpers/custom-hooks";
import IconControlBtn from "./IconControlBtn";


function MessageItem({message, handleAdmin, handleLike}) {
    const [sefRef, isHover] = useHover();
    const {author, createdAt, text, likes, likeCount} = message;
    const isMobile = useMediaQuery(('(max-width: 992px)'));
    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);
    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;
    const canGrantAdmin = isAdmin && !isAuthor;
    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid)
    const canShowIcon = isMobile || isHover;

    return <li className={`padded mb-1 cursor-pointer ${isHover ? "bg-black-02" : ""}`} ref={sefRef}>
        <div className={"d-flex align-items-center font-bolder mb-1"}>
            <PresenceDot uid={author.uid}/>
            <ProfileAvatar sec={author.avatar} name={author.name} className={"ml-1"} size={"xs"}/>
            <span className={"ml-2"}>{author.name}</span>

            <ProfileInfoBtnModal
                profile={author}
                appearance={"link"}
                className={"p-0 ml-1 text-black"}>
                {
                    canGrantAdmin &&
                    <Button
                        appearance={"primary"}
                        color={"blue"}
                        block
                        onClick={() => handleAdmin(author.uid)}>
                        {isMsgAuthorAdmin ? "Remove Admin Permission" : "Give Admin Permission"}
                    </Button>
                }

            </ProfileInfoBtnModal>
            <TimeAgo datetime={createdAt} className={"font-normal ml-2"}/>
            <IconControlBtn
                {...(isLiked ? {color: "red"} : {})}
                isVisible={canShowIcon}
                iconName={"heart"}
                tooltip={"Like this Message"}
                onclick={() => handleLike(message.id)}
                badgeContent={likeCount}
            />
            {
                isAuthor && <IconControlBtn
                    isVisible={canShowIcon}
                    iconName={"close"}
                    tooltip={"Like this Message"}
                    // onclick={() => handleLike(message.id)}
                    badgeContent={likeCount}
                />
            }
        </div>
        <div>
            <span className={"word-break-all message-send"}>{text}</span>
        </div>
    </li>
}

export default memo(MessageItem);