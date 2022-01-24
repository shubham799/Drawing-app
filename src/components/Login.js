import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { setSessionValues, UserContext, validateFields } from '../utility';
import { getUserByEmailAndPassword } from '../api/user_api';

const intialState = {
    email: '',
    password: '',
}

function Login() {
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
        const { email, password } = user;
        // extra check has been added if required is removed from DOM
        const errorMsg = validateFields(user);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        setLoading(true);
        const response = await getUserByEmailAndPassword(email, password);
        setLoading(false);
        if (response) {
            const { id, userName, color } = response;
            // sessionStorage.setItem('user', JSON.stringify({ id, userName, color }));
            setSessionValues({ id, userName, color });
            !userId && setUserId(id);
            navigate('/drawing');
        } else {
            setError("Invalid Credentials");
        }

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
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" onChange={onChange} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" onChange={onChange} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-3" type="submit">
                                    Log In
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Login

