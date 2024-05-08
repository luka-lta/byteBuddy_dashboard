import React, {FormEvent, useState} from 'react';
import {Button, Form, FormGroup, FormControl, Container} from 'react-bootstrap';
import {redirect, useNavigate} from "react-router-dom";
import {BsEyeFill, BsEyeSlashFill} from "react-icons/bs";
import './home.css';
import {useAuth} from "../utils/AuthProvider";

function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { login } = useAuth();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        login(email, password);
        navigate('/dashboard')
        // fetch('http://localhost/api/v1/user/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({email, password}),
        // }).then(response => response.json())
        //     .then(data => {
        //         if (data.success) {
        //             localStorage.setItem('token', data.data.token);
        //             navigate('/dashboard');
        //         } else {
        //             alert(data.message);
        //         }
        //     }).catch((error) => {
        //     console.error('Fehler beim Anmelden:', error);
        // });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="p-4 rounded" style={{background: '#333', width: '400px'}}>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label style={{color: '#fff'}}>Email-Adresse</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Passwort</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button variant="outline-light" onClick={togglePasswordVisibility}
                                    className="password-toggle-button">
                                {showPassword ? <BsEyeSlashFill/> : <BsEyeFill/>}
                            </Button>
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{width: '100%', marginTop: '10px'}}>
                        Einloggen
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Home;