import React, {useState} from "react";
import {auth} from "../../helpers/firebase";
import {Button, Tag} from "rsuite";
import FacebookOfficialIcon from "@rsuite/icons/legacy/FacebookOfficial";
import Google from "@rsuite/icons/legacy/Google";
import firebase from "firebase/compat/app";

export default function ProviderBlock() {
    console.log(auth.currentUser)
    const [isConnected, setIsConnected] = useState({
        'google.com': auth.currentUser.providerData.some(
            data => data.providerId === 'google.com'
        ),
        'facebook.com': auth.currentUser.providerData.some(
            data => data.providerId === 'facebook.com'
        )
    })

    const updateIsConnected = (providerId, value) => {
        setIsConnected(p => {
            return {
                ...p,
                [providerId]: value,
            }
        })
    }
    const unlink = async (providerId) => {
        try {
            if (auth.currentUser.providerData.length === 1) {
                throw new Error(`You cannot disconnect from ${providerId}`)
            }

            await auth.currentUser.unlink(providerId)
            updateIsConnected(providerId, false)

            alert(`Disconnected from ${providerId}`)
        } catch (e) {
            alert("You cannot disconnect ")
        }
    }

    const link = async (provider) => {
        try {
            await auth.currentUser.linkWithPopup(provider)

            alert(`Connected with ${provider.providerId}`)
            updateIsConnected(provider.providerId, true)
        } catch (e) {
            alert("please try again")
        }
    }
    const UnLinkGoogle = () => {
        unlink('google.com')
    }
    const UnLinkFacebook = () => {
        unlink('facebook.com')
    }
    const linkFacebook = () => {
        link(new firebase.auth.FacebookAuthProvider())
    }
    const linkGoogle = () => {
        link(new firebase.auth.GoogleAuthProvider())
    }
    return <div>
        {
            isConnected['google.com'] && (
                <Tag color={"green"} closable onClose={UnLinkGoogle}>
                    <Google/> Connected
                </Tag>
            )
        }
        {
            isConnected["facebook.com"] && (
                <Tag color={"blue"} closable onClose={UnLinkFacebook}>
                    <FacebookOfficialIcon/> Connected
                </Tag>
            )

        }
        
        <div className={"mt-2"}>
            {
                !isConnected["google.com"] && (
                    <Button
                        block appearance={"primary"} color={"green"} endIcon onClick={linkGoogle}>
                        Google <Google/>
                    </Button>
                )
            }
            {
                !isConnected["facebook.com"] && (
                    <Button block appearance={"primary"} color={"blue"} endIcon onClick={linkFacebook}>
                        Facebook <FacebookOfficialIcon/>
                    </Button>
                )
            }

        </div>
    </div>
}
