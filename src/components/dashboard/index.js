import React from 'react'
import {Button, Drawer} from "rsuite";
import {useProfile} from "../../context/profile.context";

const DashboardIndex = ({onSignOut}) => {

    const {profile} = useProfile();
    return <>
        <Drawer.Header>
            <Drawer.Title>
                Dashboard
            </Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
            <h3 className={'mb-3'}>Hello, {profile.name}</h3>

                <Button
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

