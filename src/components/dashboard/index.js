import React from 'react'
import {Button, Divider, Drawer} from "rsuite";
import {useProfile} from "../../context/profile.context";
import EditableInput from "../EditableInput";
import {database} from "../../helpers/firebase";
import ProviderBlock from "./ProviderBlock";
import AvatarUpload from "./AvatarUpload";

const DashboardIndex = ({onSignOut}) => {
    const {profile} = useProfile();

    const onSave = async (newData) => {
        const nameRef = database.ref(`/profiles/${profile.uid}`).child('name')
        try {
            await nameRef.set(newData)
            alert("your name has been updated")
        } catch (e) {
            alert("Error! Please try again")
        }
    }

    return <>
        <Drawer.Header>
            <Drawer.Title>
                Dashboard
            </Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
            <h3 className={'mb-3'}>Hello, {profile.name}</h3>
            <ProviderBlock/>
            <Divider/>
            <EditableInput
                name={"Name"}
                initialValue={profile.name}
                onSave={onSave}
                label={<h6 className={"mb-2"}>Name</h6>}
            />
            <AvatarUpload/>

            <Divider/>
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

