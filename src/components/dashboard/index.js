import React from 'react'
import {Alert, Button, Divider, Drawer} from "rsuite";
import {useProfile} from "../../context/profile.context";
import EditableInput from "../EditableInput";
import {database} from "../../helpers/firebase";
import ProviderBlock from "./ProviderBlock";
import AvatarUpload from "./AvatarUpload";
import {getUserUpdate} from "../../helpers/helpers";

const DashboardIndex = ({onSignOut}) => {
    const {profile} = useProfile();

    const onSave = async (newData) => {
        try {

            const updates = await getUserUpdate(profile.uid, 'name', newData, database)
            await  database.ref().update(updates)
            Alert.success("Your name has been updated")

        } catch (e) {
            Alert.error("Error! Please try again")
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

