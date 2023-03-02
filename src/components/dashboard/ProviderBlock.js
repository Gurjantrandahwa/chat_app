import React, {useState} from "react";
import {auth} from "../../helpers/firebase";
import {Button, Icon, Tag} from "rsuite";
import firebase from "firebase/compat/app";

export default function ProviderBlock() {
    // console.log(auth.currentUser)
    const [isConnected, setIsConnected] = useState({
        'google.com': auth.currentUser?.providerData.some(
            data => data.providerId === 'google.com'
        ),
        'facebook.com': auth.currentUser?.providerData.some(
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
    const UnLinkGoogle =async () => {
        await unlink('google.com')
    }
    const UnLinkFacebook =async () => {
        await  unlink('facebook.com')
    }
    const linkFacebook = async() => {
      await  link(new firebase.auth.FacebookAuthProvider())
    }
    const linkGoogle = async () => {
        await link(new firebase.auth.GoogleAuthProvider())
    }
    return <div>
        {
            isConnected['google.com'] && (
                <Tag color={"green"} closable onClose={UnLinkGoogle}>
                    <Icon icon={"google"}/> Connected
                </Tag>
            )
        }
        {
            isConnected["facebook.com"] && (
                <Tag color={"blue"} closable onClose={UnLinkFacebook}>
               <Icon icon={"facebook-official"}/> Connected
                </Tag>
            )

        }

        <div className={"mt-2"}>
            {
                !isConnected["google.com"] && (
                    <Button
                        block appearance={"primary"} color={"green"}  onClick={linkGoogle}>
                        <Icon icon={"google"}/> Google
                    </Button>
                )
            }
            {
                !isConnected["facebook.com"] && (
                    <Button block appearance={"primary"} color={"blue"} onClick={linkFacebook}>
                        <Icon icon={"facebook-official"}/>  Facebook
                    </Button>
                )
            }

        </div>
    </div>
}
