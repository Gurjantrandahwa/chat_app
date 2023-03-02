import React from "react";
import { Modal} from "rsuite";
import {useModalState} from "../../../helpers/custom-hooks";

export default function ImgModal({src, fileName}) {

    const {close, isOpen, open} = useModalState();

    return <>
        <input className={"mw-100 mh-100 w-auto"}
               type={"image"} src={src} alt={"file"} onClick={open}/>

        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>
                    {fileName}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className={"d-flex align-items-center justify-content-center mt-3"}>
                    <img src={src} height={"150px"} width={"150px"} alt={"file"}/>
                </div>
            </Modal.Body>

            <Modal.Footer className={"d-flex align-items-center justify-content-center"}>
                <a href={src} target={"_blank"} rel={"noopener noreferrer"}>
                    View Original
                </a>
            </Modal.Footer>
        </Modal>
    </>
}