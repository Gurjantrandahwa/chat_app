import React, {useCallback, useRef, useState} from "react";
import {Button, Form, Message, Modal, Schema, toaster} from "rsuite";
import {Creative} from "@rsuite/icons";
import {useModalState} from "../helpers/custom-hooks";
import FormGroup from "rsuite/FormGroup";
import FormControlLabel from "rsuite/FormControlLabel";
import FormControl from "rsuite/FormControl";
import firebase from "firebase/compat/app";
import {database} from "../helpers/firebase";

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
            createdAt: firebase.database.ServerValue.TIMESTAMP
        }

        try {
            await database.ref('rooms').push(newRoomData)
            toaster.push(
                <Message showIcon type={"success"}>
                    {`Your Chat Room has been Created`}
                </Message>
            )
            setLoading(false)
            setFormValue(INITIAL_VALUES);
            close();

        } catch (e) {
            setLoading(false)
            toaster.push(
                <Message showIcon type={"error"}>
                    Please Try Again
                </Message>
            )
        }
    }

    return <div className={"mt-2"}>
        <Button appearance={"primary"} block color={"violet"} onClick={open}>
            <Creative/> Create New Chat Room
        </Button>
        <Modal open={isOpen} onClose={close}>
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
                        <FormControlLabel className={"mb-2"}>Room Name</FormControlLabel>
                        <FormControl
                            name="name"
                            placeholder={"Enter Chat Room Name..."}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel className={"mb-2"}>Description</FormControlLabel>
                        <FormControl

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
