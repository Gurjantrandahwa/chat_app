import React, {useCallback} from 'react'
import {Alert, Button, Drawer, Icon} from "rsuite";

import {useMediaQuery, useModalState} from "../../helpers/custom-hooks";
import DashboardIndex from "./index";
import {auth, database} from "../../helpers/firebase";
import {isOfflineForDatabase} from "../../context/profile.context";


const DashboardToggle = () => {
    const {isOpen, open, close} = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)')


const onSignOut = useCallback(() => {
    database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(() => {
        auth.signOut();
        Alert.info("Signed Out")
        close();

    }).catch(e=>{
        Alert.error(e.message)
    })

}, [close])
    return <>
        <Button
            block
            appearance={"primary"}
            color={"blue"}
            onClick={open}
            >
         <Icon icon={"dashboard"}/> Dashboard
        </Button>

        <Drawer
            full={isMobile}
            show={isOpen}
            onHide={close}
            placement={"left"}>

            <DashboardIndex onSignOut={onSignOut}/>
        </Drawer>
    </>
}

export default DashboardToggle

