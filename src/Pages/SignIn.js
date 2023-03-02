import React from "react";
import {Alert, Button, Col, Container, Grid, Icon, Panel, Row} from "rsuite";
import firebase from 'firebase/compat/app';
import {auth, database} from "../helpers/firebase";


export default function SignIn() {
    const signInWithProvider = async (provider) => {

        try {

            const {additionalUserInfo, user} = await auth.signInWithPopup(provider);

            if (additionalUserInfo.isNewUser) {
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                })
            }
            Alert.success("Signed In", 4000)


        } catch (e) {
            Alert.error("Please Try Again", 4000)
        }
    }
    const onFacebookSignIn = async () => {
      await  signInWithProvider(new firebase.auth.FacebookAuthProvider())
    }

    const onGoogleSignIn = async () => {
      await  signInWithProvider(new firebase.auth.GoogleAuthProvider())
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
                            >
                                <Icon icon={"facebook-official"}/> Continue with Facebook
                            </Button>
                            <Button
                                onClick={onGoogleSignIn}
                                block color="green"
                                appearance="primary"
                            >
                                <Icon icon={"google"}/> Continue with Google
                            </Button>
                        </div>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    </Container>
}
