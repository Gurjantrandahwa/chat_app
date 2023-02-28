import React, {memo} from "react";
import {useCurrentRoom} from "../../../context/current-room-context";
import {Button, Modal} from "rsuite";
import {useModalState} from "../../../helpers/custom-hooks";

function RoomInfoModal() {
    const {isOpen, close, open} = useModalState();
    const description = useCurrentRoom(v => v.description);
    const name = useCurrentRoom(v => v.name);

    return <>
        <Button
            appearance={"link"}
            className={"px-0 link-unstyled"}
            onClick={open}
            color={"red"}>
            Room Information
        </Button>
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>
                    About {name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h6 className={"mb-1"}>
                    Description
                </h6>
                <p>  {description}</p>

            </Modal.Body>
            <Modal.Footer>
                <Button
                    block
                    appearance={"ghost"}
                    color={"red"}
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default memo(RoomInfoModal);