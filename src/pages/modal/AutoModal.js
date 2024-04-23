import React from "react";
import Modal from "react-bootstrap/Modal";

const AutoModal = ({ message, show, onHide, countdown}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>メッセージ</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                {countdown}
            </Modal.Footer>
        </Modal>
    );
};

export default AutoModal;
