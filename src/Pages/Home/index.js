import React from "react";
import {Col, Grid, Row} from "rsuite";
import Sidebar from "../../components/Sidebar";
import {Route, Routes, useMatch} from "react-router";
import Chat from "./Chat";
import {useMediaQuery} from "../../helpers/custom-hooks";
import { useResolvedPath } from "react-router-dom";

export default function Index() {
    const isDesktop = useMediaQuery('(min-width: 760px)')
    const resolvedPath = useResolvedPath();
    const strictlyMatchesHome = resolvedPath.pathname === "/";

    const canRenderSidebar = isDesktop || strictlyMatchesHome;

    return <Grid fluid className={"h-100"}>
        <Row className={"h-100"}>
            {
                canRenderSidebar &&
                <Col xs={24} md={8} className={"h-100"}>
                    <Sidebar/>
                </Col>
            }

            <Routes>
                <Route exact path={"/chat/:chatId"} element={
                    <Col xs={24} md={16} className={"h-100"}>
                        <Chat/>
                    </Col>
                }/>


                <Route  element={
                    isDesktop &&
                    <Col xs={24} md={16} className={"h-100"}>
                        <h6 className={"text-center mt-page"}>
                            Please Select Chat
                        </h6>
                    </Col>
                }
                />


            </Routes>

        </Row>
    </Grid>
}
