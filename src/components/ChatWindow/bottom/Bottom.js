import React, {useCallback, useState} from "react";
import {Icon, Input, InputGroup} from "rsuite";


function assembleMessage(profile,chatId) {
    return{
        roomId:chatId,
        author:{},
    }
}
export default function Bottom() {
    const [input, setInput] = useState('')

    const onInputChange = useCallback((value) => {

        setInput(value)

    }, [])

    const onSendClick = () => {
        if (input.trim() === '') {
            return
        }
    }
    return <div>
        <InputGroup>

            <Input
                placeholder={"Write a message here..."}
                value={input}
                onChange={onInputChange}
                type={"text"}
            />

            <InputGroup.Button color={"blue"} appearance={"primary"} onClick={onSendClick}>
                <Icon icon={"send"}/>
            </InputGroup.Button>
        </InputGroup>
    </div>
}