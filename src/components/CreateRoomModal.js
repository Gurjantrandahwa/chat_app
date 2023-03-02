import React, {useCallback, useRef, useState} from "react";
import {Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema} from "rsuite";
import {useModalState} from "../helpers/custom-hooks";
import firebase from "firebase/compat/app";
import {auth, database} from "../helpers/firebase";

const {StringType} = Schema.Types;
const model = Schema.Model({
    name: StringType().isRequired("Please enter the chat name"),
    description: StringType().isRequired("Please enter the chat description")

})
const INITIAL_VALUES = {
    name: "",
    description: ""
}
export default function CreateRoomModal() {
    const {isOpen, open, close} = useModalState();
    const [formValue, setFormValue] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    const onFormChange = useCallback((value) => {
        setFormValue(value)
    }, []);

    const onSubmit = async () => {
        if (!formRef.current.check()) {
            return;
        }
        setLoading(true)
        const newRoomData = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            admins: {
                [auth.currentUser.uid]: true
            }
        }

        try {
            await database.ref('rooms').push(newRoomData)
            Alert.success(`Your chat room has been created`, 4000)
            setLoading(false)
            setFormValue(INITIAL_VALUES);
            close();

        } catch (e) {
            setLoading(false)
            Alert.error("Please try again later")
        }
    }

    return <div className={"mt-2"}>
        <Button appearance={"primary"} block color={"violet"} onClick={open}>
            <Icon icon={"creative"}/> Create New Chat Room
        </Button>
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>
                    New Chat Room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    fluid
                    ref={formRef}
                    model={model}
                    onChange={onFormChange}
                    formValue={formValue}>
                    <FormGroup>
                        <ControlLabel className={"mb-2"}>Room Name</ControlLabel>
                        <FormControl
                            name="name"
                            placeholder={"Enter Chat Room Name..."}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={"mb-2"}>Description</ControlLabel>
                        <FormControl
                            rows={5}
                            componentClass="textarea"
                            name="description"
                            placeholder={"Enter Room Description..."}/>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    appearance={"primary"}
                    block color={"violet"}
                    onClick={onSubmit}
                    disabled={loading}>
                    Create New Chat Room
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
