import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { generateRandomColor, UserContext, validateFields } from '../utility';
import { addUser, checkEmailIdExist, getUserById } from '../api/user_api';

const intialState = {
    email: '',
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    color: generateRandomColor()
}

const SignUp = () => {
    const navigate = useNavigate();
    const { userId, setUserId } = useContext(UserContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(intialState);

    const onChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        error && setError('');
        // extra check has been added if required is removed from DOM
        const errorMsg = validateFields(user);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        setLoading(true);
        //check for unique email id
        const isEmailIdPresent = await checkEmailIdExist(user.email);
        if (isEmailIdPresent) {
            setError('Email already exist');
            setLoading(false);
            return;
        }
        const response = await addUser(user);
        const { id, userName, color } = await getUserById(response.id);
        sessionStorage.setItem('user', JSON.stringify({ id, userName, color }));
        !userId && setUserId(id);
        setLoading(false);
        navigate('/drawing');
    }

    return (
        <div>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" onChange={onChange} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" name="userName" onChange={onChange} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" onChange={onChange} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="firstName" onChange={onChange} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" onChange={onChange} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-3" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SignUp
