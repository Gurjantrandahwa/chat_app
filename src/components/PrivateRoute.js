import React from "react";
import {Redirect} from "react-router";

export default function PrivateRoute({children,...routeProps}) {

    const profile = false;

    if(!profile){
        return <Redirect to={"/signIn"}/>
    }
    return    <div>

    </div>
}
