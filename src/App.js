import React from "react";
import 'rsuite/dist/rsuite.min.css';
import {Route, Routes} from "react-router-dom";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import "./styles/main.scss";
function App() {
    const profile = false;

    return <div>
        {
           !profile ? (
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
