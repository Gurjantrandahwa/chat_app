import React, {useState} from "react";
import {Alert, Button, Icon, InputGroup, Modal, Uploader} from "rsuite";
import {useModalState} from "../../../helpers/custom-hooks";
import {useParams} from "react-router";
import {storage} from "../../../helpers/firebase";

const MAX_SIZE = 1000 * 1024 * 5;

export default function AttachmentModal({afterUpload}) {
    const {isOpen, open, close} = useModalState();
    const [fileList, setFileList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const {chatId} = useParams();

    const onChange = (fileArr) => {
        const filtered = fileArr.filter(el => el.blobFile.size <= MAX_SIZE).slice(0, 5);

        setFileList(filtered)
    }
    const onUpload = async () => {

        try {
            const uploadPromises = fileList.map(f => {
                return storage
                    .ref(`/chat/${chatId}`)
                    .child(Date.now() + f.name)
                    .put(f.blobFile, {cacheControl: `public,max-age=${3600 * 24 * 3}`})
            })

            const uploadSnapshots = await Promise.all(uploadPromises);
            const shapePromises = uploadSnapshots.map(async snap => {
                return {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
                    url: await snap.ref.getDownloadURL()
                }
            })

            const files = await Promise.all(shapePromises);
            await afterUpload(files)
            setLoading(false)
            close();

        } catch (e) {
            setLoading(false)
            Alert.error(e.message)
        }

    }
    return <div className={"ml-1 mt-1"}>

        <InputGroup.Button onClick={open}>
            <Icon icon={"attachment"}/>
        </InputGroup.Button>
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>
                    Upload Files
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Uploader
                    autoUpload={false}
                    action=""
                    onChange={onChange}
                    multiple
                    fileList={fileList}
                    listType={"picture-text"}
                    className={"w-100"}
                    disabled={isLoading}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={isLoading}
                    block
                    onClick={onUpload}
                    appearance={"primary"}
                    color={"green"}>
                    Send to Chat
                </Button>
                <div className={"text-right mt-2"}>
                    <small>* only files less than 5 mb are allowed</small>
                </div>
            </Modal.Footer>
        </Modal>
    </div>
}