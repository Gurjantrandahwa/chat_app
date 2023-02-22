import React from "react";
import 'rsuite/dist/rsuite.min.css';
import {Route, Routes} from "react-router-dom";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import "./styles/main.scss";
import {useProfile} from "./context/profile.context";
import {Container, Loader} from "rsuite";

function App() {
    const {profile, loading} = useProfile();
    if (loading && !profile) {
        return <Container>
            <Loader center vertical size={"md"} content={"Loading"} speed={"slow"}/>
        </Container>
    }
    return <div>
        {
            !profile && !loading ? (
                <SignIn/>
            ) : (
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                </Routes>
            )
        }

    </div>
}

export default App;
