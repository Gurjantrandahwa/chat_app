import React, {memo} from "react";
import {Alert, Button, Drawer} from "rsuite";
import {useMediaQuery, useModalState} from "../../../helpers/custom-hooks";
import EditableInput from "../../EditableInput";
import {useCurrentRoom} from "../../../context/current-room-context";
import {database} from "../../../helpers/firebase";
import {useParams} from "react-router";

function EditRoomBtn() {
    const {open, close, isOpen} = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)')
    const name = useCurrentRoom(v => v.name)
    const description = useCurrentRoom(v => v.description)
    const {chatId} = useParams();

    const updateData = (key, value) => {
        database.ref(`rooms/${chatId}`).child(key).set(value).then(() => {
            Alert.success("Successfully Updated", 4000)
        }).catch(e => {
            Alert.error(e.message, 4000)
        })
    }
    const onNameSave = (newName) => {
        updateData('name', newName)
    }
    const onDescriptionSave = (newDescription) => {
        updateData('description', newDescription)
    }
    return <div>
        <Button
            className={"br-circle"}
            size={"sm"}
            color={"red"}
            onClick={open}
        >A
        </Button>

        <Drawer full={isMobile} show={isOpen} onHide={close} placement={"right"}>

            <Drawer.Header>
                <Drawer.Title>
                    Edit Room
                </Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>

                <EditableInput
                    initialValue={name}
                    emptyMsg={"Name can not be empty"}
                    onSave={onNameSave}
                    label={<h6 className={"mb-2"}>
                        Name
                    </h6>}/>

                <EditableInput
                    componentClass={"textarea"}
                    rows={5}
                    initialValue={description}
                    emptyMsg={"Description can not be empty"}
                    label={<h6 className={"mb-2 mt-2"}>
                        Description
                    </h6>}
                    onSave={onDescriptionSave}
                />

            </Drawer.Body>

            <Drawer.Footer>
                <Button block appearance={"primary"} color={"red"} onClick={close}>Close</Button>
            </Drawer.Footer>

        </Drawer>
    </div>
}

export default memo(EditRoomBtn)