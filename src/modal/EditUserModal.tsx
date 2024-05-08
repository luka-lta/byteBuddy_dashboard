import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {UserData} from "../interfaces/UserData";
import {useAuth} from "../utils/AuthProvider";

interface EditUserModalProps {
    user: UserData;
    show: boolean;
    handleClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, show, handleClose }) => {
    const [editedUser, setEditedUser] = useState({...user});
    const {token} = useAuth();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedUser({...editedUser, [name]: value});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        fetch(`http://localhost/api/v1/user/${editedUser.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(editedUser),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
            }).catch((error) => {
            console.error('Fehler beim API-Aufruf:', error);
        });

        console.log('Updated User:', editedUser);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicRoles">
                        <Form.Label>Rollen</Form.Label>
                        <Form.Control
                            type="roles"
                            name="roles"
                            value={editedUser.role}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Weitere Formularfelder für andere Benutzerdaten hier hinzufügen */}
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditUserModal;
