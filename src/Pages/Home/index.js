import React from "react";
import {Col, Grid, Row} from "rsuite";
import Sidebar from "../../components/Sidebar";
import {Route, Routes} from "react-router-dom";
import Chat from "./Chat";
import { Link } from "react-router-dom";

export default function Index() {

    return <Grid fluid className={"h-100"}>
        <Row className={"h-100"}>
            <Col xs={24} md={8} className={"h-100"}>
             <Sidebar />
            </Col>
            <Routes>
                    <Route exact path={"/chat/:chatId"} element={
                        <Col xs={24} md={16} className={"h-100"}>
                             <Chat />
                        </Col>
                    }/>
            </Routes>

        </Row>
    </Grid>
}
