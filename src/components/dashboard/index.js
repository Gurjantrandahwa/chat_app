import React from 'react'
import {Button, Divider, Drawer} from "rsuite";
import {useProfile} from "../../context/profile.context";
import EditableInput from "../EditableInput";

const DashboardIndex = ({onSignOut}) => {
    const onSave = async (newData) => {
console.log(newData)
    }

    const {profile} = useProfile();
    return <>
        <Drawer.Header>
            <Drawer.Title>
                Dashboard
            </Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
            <h3 className={'mb-3'}>Hello, {profile.name}</h3>
            <Divider/>
            <EditableInput
                name={"Name"}
                initialValue={"Profile name"}
                onSave={onSave}
                label={<h6 className={"mb-2"}>Name</h6>}
            />
            <Button
                className={"mt-4"}
                onClick={onSignOut}
                block
                color={"red"}
                appearance={"primary"}>
                Sign Out
            </Button>
        </Drawer.Body>

    </>
}

export default DashboardIndex

