import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { Modal, FormControl, Button, Form, Alert } from "react-bootstrap";
import { addDrawings } from '../api/canvas_api';
import { getSessionValues, clearSessionValues, UserContext } from '../utility';

const CreateNewDrawing = () => {
    const navigate = useNavigate();
    const { setUserId } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [drawingName, setDrawingName] = useState('');
    const { userName } = getSessionValues();

    const handleClose = () =>{
        setShow(false);
        setError('');
    } 
    const handleShow = () => setShow(true);

    const handleSave = async () => {
        if (drawingName) {
            await addDrawings(drawingName);
            setShow(false);
            setDrawingName('');
        } else {
            setError('Drawing Name is Required!')
        }
    }

    const handleLogout = () => {
        clearSessionValues();
        setUserId('');
        navigate('/');
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Button variant="primary" onClick={handleShow}>
                    Create New Drawing
                </Button>
                <div>
                    <span style={{ fontSize: 20, fontWeight: 600, marginRight: 10 }} >Welcome: {userName}</span>
                    <Button variant="dark" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create New Drawing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Label htmlFor="basic-url">Drawing Name</Form.Label>
                    <FormControl
                        placeholder="Enter Drawing Name"
                        name="drawingName"
                        value={drawingName}
                        onChange={(event) => setDrawingName(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateNewDrawing
