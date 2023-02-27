import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ProfileProvider} from "./context/profile.context";
import {RoomsProvider} from "./context/room.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ProfileProvider>
            <RoomsProvider>
                <App/>
            </RoomsProvider>

        </ProfileProvider>

    </BrowserRouter>
);

