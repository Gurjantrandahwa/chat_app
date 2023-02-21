import React from "react";
import {Button, Col, Container, Grid, Panel, Row} from "rsuite";
import { Alert } from 'rsuite';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import Google from "@rsuite/icons/legacy/Google";
import firebase from 'firebase/compat/app';

import {auth} from "../helpers/firebase";

export default function SignIn() {
    const signInWithProvider = async (provider) => {

        try {

            const result = await auth.signInWithPopup(provider)

        } catch (e) {
           return <Alert showIcon  closable title="error" description="Please try Again"/>
        }
    }

    const onFacebookSignIn = () => {
        signInWithProvider(new firebase.auth.FacebookAuthProvider())
    }

    const onGoogleSignIn = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider())
    }
    return <Container>
        <Grid className={"mt-page"}>
            <Row>
                <Col xs={24} md={12} mdOffset={6}>
                    <Panel>
                        <div className={"text-center"}>
                            <h2>Welcome to Chat</h2>
                            <p>A progressive chat platform </p>
                        </div>
                        <div className={"mt-3"}>
                            <Button
                                onClick={onFacebookSignIn}
                                block color="blue"
                                appearance="primary"
                                endIcon={<FacebookOfficialIcon/>}>
                                Continue with Facebook
                            </Button>
                            <Button
                                onClick={onGoogleSignIn}
                                block color="green"
                                appearance="primary"
                                endIcon={<Google/>}>
                                Continue with Google
                            </Button>
                        </div>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    </Container>
}
