import React, {useCallback, useState} from 'react'
import {Alert, Button, Drawer, Icon} from "rsuite";

import {useModalState} from "../../helpers/custom-hooks";
import DashboardIndex from "./index";
import {auth, database} from "../../helpers/firebase";
import {isOfflineForDatabase} from "../../context/profile.context";


const DashboardToggle = () => {
    const {isOpen, open, close} = useModalState();
    const [drawerPlacement, setDrawerPlacement] = useState('left');

    const handleMediaQuery = () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            setDrawerPlacement('bottom');
        } else {
            setDrawerPlacement('left');
        }
    }
    window.addEventListener("resize", handleMediaQuery);



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
            show={isOpen}
            onHide={close}
            placement={drawerPlacement}>

            <DashboardIndex onSignOut={onSignOut}/>
        </Drawer>
    </>
}

export default DashboardToggle

