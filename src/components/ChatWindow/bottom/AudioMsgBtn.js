import React, {useCallback, useState} from "react";
import {Alert, Icon, InputGroup} from "rsuite";
import {ReactMic} from 'react-mic';
import {storage} from "../../../helpers/firebase";
import {useParams} from "react-router";

export default function AudioMsgBtn({afterUpload}) {
    const [isRecording, setRecording] = useState(false)
    const [isUploading, setUploading] = useState(false);
    const {chatId} = useParams();
    const onClick = useCallback(() => {

        setRecording(p => !p)
    }, [])

    const onUpload = useCallback(async (data) => {
        setUploading(true)

        try {
            const snap = await storage
                .ref(`/chat/${chatId}`)
                .child(`audio_${Date.now()}.mp3`)
                .put(data.blobFile, {cacheControl: `public,max-age=${3600 * 24 * 3}`})

            const file = {
                contentType: snap.metadata.contentType,
                name: snap.metadata.name,
                url: await snap.ref.getDownloadURL()
            }

            setUploading(false)
            afterUpload([file])

        } catch (e) {
            setUploading(false)
            Alert.error(e.message)
        }
    }, [afterUpload, chatId])


    return <div className={"mt-1"}>

        <InputGroup.Button onClick={onClick} disabled={isUploading} className={isRecording?"animate-blink":""}>
            <Icon icon={"microphone"}/>
            <ReactMic
                record={isRecording}
                className="d-none"
                onStop={onUpload}
                mimeType="audio/mp3"
            />
        </InputGroup.Button>
    </div>
}