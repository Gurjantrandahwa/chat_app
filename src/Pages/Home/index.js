import React from "react";
import {Col, Grid, Row} from "rsuite";
import Sidebar from "../../components/Sidebar";
import {Route, Routes, useRouteMatch} from "react-router";
import Chat from "./Chat";
import {useMediaQuery} from "../../helpers/custom-hooks";


export default function Index() {
    const isDesktop = useMediaQuery('(min-width: 992px)')
    const { isExact }= useRouteMatch();

    const canRenderSidebar = isDesktop || isExact;

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
                <Route>
                    {
                        isDesktop && <Col xs={24} md={16} className={"h-100"}>
                            <h6 className={"text-center mt-page"}>
                                Please Select Chat
                            </h6>
                        </Col>

                    }
                </Route>
            </Routes>

        </Row>
    </Grid>
}
