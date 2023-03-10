import React,{Suspense} from "react";
import "rsuite/dist/styles/rsuite-default.css"
import {Route, Routes} from "react-router-dom";
// import SignIn from "./Pages/SignIn";
import Index from "./Pages/Home";
import "./styles/main.scss";
import {useProfile} from "./context/profile.context";
import {Container, Loader} from "rsuite";

const SignIn =React.lazy(()=>import('./Pages/SignIn'))
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
                <Suspense fallback={<div>Loading...</div>}>
                    <SignIn/>
                </Suspense>

            ) : (
                <Routes>
                    <Route  path={"*"} element={<Index/>}/>
                </Routes>
            )
        }

    </div>
}

export default App;
