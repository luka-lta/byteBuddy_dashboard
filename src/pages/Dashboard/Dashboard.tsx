import React from 'react';
import {Col, Container} from 'react-bootstrap';
import {jwtDecode} from "jwt-decode";

function Dashboard() {
    const tokenString = localStorage.getItem('token');

    if (tokenString) {
        const token = jwtDecode(tokenString as string); // Typ-Assertion zu 'string'
        console.log(token);
    }


    return (
        <Container fluid>
            <h1>Hello</h1>
        </Container>
    );
}

export default Dashboard;
