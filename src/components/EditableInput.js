import React, {useCallback, useState} from "react";
import {Input, InputGroup} from "rsuite";
import {Check, Close, Edit} from "@rsuite/icons";


export default function EditableInput({

                                          onSave,
                                          label = null,
                                          placeholder = "Write your value",
                                          initialValue,
                                          emptyMsg = "Input is empty",
                                          ...inputProps
                                      }) {

    const [input, setInput] = useState(initialValue);
    const [isEditable, setIsEditable] = useState(false)

    const editClick = useCallback(() => {

        setIsEditable(p => !p)
        setInput(initialValue)

    }, [initialValue])

    const onSaveClick = async () => {
        const trimmed = input.trim();
        if (trimmed === '') {
            alert(emptyMsg)
        }
        if (trimmed !== initialValue) {
         await onSave(trimmed)
        }

        setIsEditable(false)
    }

    const onInputChange = useCallback((value) => {
        setInput(value)
    }, [])
    return <div>

        {label}
        <InputGroup>
            <Input
                {...inputProps}
                disabled={!isEditable}
                value={input}
                placeholder={placeholder}
                onChange={onInputChange}
            />
            <InputGroup.Button onClick={editClick}>
                {
                    isEditable ? <Close color={"red"}/> : <Edit color={"#0d73d4"}/>
                }

            </InputGroup.Button>

            {
                isEditable &&
                <InputGroup.Button onClick={onSaveClick}>
                    <Check color={"green"}/>
                </InputGroup.Button>

            }
        </InputGroup>

    </div>
}
