import React from "react";
import {Avatar} from "rsuite";
import {getNameInitials} from "../helpers/helpers";

export default function ProfileAvatar({name, ...avatarProps}) {

    return <div>

        <Avatar circle
            {...avatarProps}
        >
            {getNameInitials(name)}
        </Avatar>

    </div>
}
