import React, {useCallback} from 'react'
import {Button, Drawer} from "rsuite";

import {useMediaQuery, useModalState} from "../../helpers/custom-hooks";
import DashboardIndex from "./index";
import {Dashboard} from "@rsuite/icons";
import {auth} from "../../helpers/firebase";


const DashboardToggle = () => {
    const {isOpen, open, close} = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');
    const onSignOut = useCallback(() => {
        auth.signOut();

        alert("Signed Out")
        close();

    }, [close])
    return <>
        <Button
            block
            appearance={"primary"}
            color={"blue"}
            onClick={open}
            startIcon={<Dashboard/>}>
            Dashboard
        </Button>

        <Drawer
            full={isMobile}
            open={isOpen}
            onClose={close}
            placement={"left"}>

            <DashboardIndex onSignOut={onSignOut} />
        </Drawer>
    </>
}

export default DashboardToggle

