import React, {useRef, useState} from "react";
import {Alert, Button, Modal} from "rsuite";
import {useModalState} from "../../helpers/custom-hooks";
import AvatarEditor from 'react-avatar-editor'
import {useProfile} from "../../context/profile.context";
import {database, storage} from "../../helpers/firebase";
import ProfileAvatar from "../ProfileAvatar";
import {getUserUpdate} from "../../helpers/helpers";


const getBlob = (canvas) => {

    return new Promise((resolve, reject) => {

        canvas.toBlob(blob => {
            if (blob) {
                resolve(blob)
            } else {
                reject(new Error("File Process Error"))
            }
        })
    })
}

export default function AvatarUpload() {

    const {isOpen, open, close} = useModalState();
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const {profile} = useProfile();
    const avatarEditorRef = useRef();


    const onUploadClick = async () => {
        const canvas = avatarEditorRef.current?.getImageScaledToCanvas();
        if (!canvas) {
            Alert.info("Please select an image first");
            return;
        }
        setLoading(true)

        try {

            const blob = await getBlob(canvas);
            const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child("avatar");
            const uploadAvatarResult = await avatarFileRef.put(blob);
            const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

            const updates = await getUserUpdate(profile.uid, 'avatar', downloadUrl, database)

            await database.ref().update(updates);
            setLoading(false)
            Alert.success(" Avatar has been uploaded", 2000)

        } catch (e) {
            console.error(e);
            Alert.error("Please try Again", 2000)
            setLoading(false);

        }
    }

    const onFileInputChange = (e) => {
        const file = e.target.files[0]
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setImage(file)

            open();

        } else {
            setImage(null)
            Alert.info("Please upload a .png, .jpeg, or .jpg file")
        }
    }


    return <div className={"mt-3 text-center"}>

        <ProfileAvatar
            src={profile.avatar}
            name={profile.name}
            className={"width-200 height-200 img-fullsize font-huge"}/>
        <div className={"select-avatar"}>

            <label
                htmlFor={"avatar-upload"}
                className={"d-block cursor-pointer padded"}
            >
                Select new Avatar
                <input
                    id={"avatar-upload"}
                    type={"file"}
                    className={'d-none'}
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={onFileInputChange}
                />

            </label>

            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        Adjust and Upload the Avatar
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className={"avatar"}>
                        {
                            image &&

                            <AvatarEditor
                                ref={avatarEditorRef}
                                image={image}
                                width={200}
                                height={200}
                                border={10}
                                borderRadius={100}
                                rotate={0}
                            />
                        }
                    </div>

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        onClick={onUploadClick}
                        appearance={"ghost"}
                        block
                        disabled={loading}>
                        Upload New Avatar
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    </div>
}
