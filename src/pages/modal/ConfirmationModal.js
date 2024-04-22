import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmationModal = ({ message, show, onHide, onConfirm }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onConfirm}>
                    はい
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    いいえ
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
