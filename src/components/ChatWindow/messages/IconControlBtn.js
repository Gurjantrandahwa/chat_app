import React from "react";
import {Badge, Icon, IconButton, Tooltip, Whisper} from "rsuite";


const ConditionalBadge = ({condition, children}) => {
    return condition ? <Badge content={condition}>{children}</Badge> : children;
}
export default function IconControlBtn({
                                           iconName,
                                           badgeContent,
                                           isVisible,
                                           onclick,
                                           tooltip,
                                           ...props
                                       }) {


    return <div className={"ml-2"} style={{visibility: isVisible ? 'visible' : 'hidden'}}>

        <ConditionalBadge condition={badgeContent}>
            <Whisper placement={"top"} delay={0} delayHide={0} delayShow={0} trigger={"hover"}
                     speaker={<Tooltip>{tooltip}</Tooltip>}>
                <IconButton
                    onClick={onclick}
                    {...props}
                    circle
                    size={"xs"}
                    icon={<Icon icon={iconName}/>}
                />
            </Whisper>
        </ConditionalBadge>
    </div>
}