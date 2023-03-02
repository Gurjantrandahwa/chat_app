import React from "react";
import {Button, Modal} from "rsuite";
import {useModalState} from "../../../helpers/custom-hooks";
import ProfileAvatar from "../../ProfileAvatar";


export default function ProfileInfoBtnModal({profile,children,...btnProps}) {
    const {isOpen, close, open} = useModalState()
    const {name, createdAt, avatar} = profile;
    const firstLetter = profile.name.split(' ')[0]
    const memberSince = new Date(createdAt).toLocaleTimeString();

    return <>
        <Button {...btnProps} onClick={open}>
            {firstLetter}
        </Button>
        <Modal show={isOpen} onHide={close}>

            <Modal.Header>
                <Modal.Title>{firstLetter} profile</Modal.Title>
            </Modal.Header>

            <Modal.Body className={"text-center"}>
                <ProfileAvatar
                    src={avatar}
                    name={name}
                    className={"width-200 height-200 img-fullsize font-huge"}/>

                <h4 className={"mt-2 text-black"}>{name}</h4>
                <p>Member since {memberSince}</p>
            </Modal.Body>

            <Modal.Footer>
                {children}
                <Button block onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
}