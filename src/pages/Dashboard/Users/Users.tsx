import React, { useEffect, useState } from 'react';
import {Container, Spinner, Table, Button, InputGroup, FormControl} from 'react-bootstrap';
import EditUserModal from '../../../modal/EditUserModal';
import { UserData } from '../../../interfaces/UserData';
import Sidebar from "../../../utils/Sidebar";

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        fetch('http://localhost/api/v1/user/all')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fehler beim Laden der Benutzer:', error);
                setLoading(false);
            });
    };

    const handleEdit = (user: UserData) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
        setTimeout(fetchUsers, 500);
    };

    return (
        <>
            <Sidebar />
            <Container className="container">
                <div className="user-management-header">
                    <h1 className="mb-4">Users</h1>
                    <Button variant="primary">New</Button>
                    <InputGroup className="mb-3 search-input">
                        <FormControl placeholder="Search" />
                    </InputGroup>
                    {loading ? (
                        <Spinner animation="border" role="status" className="text-light">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>Edit</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user: UserData) => (
                                        <tr key={user.userId}>
                                            <td>{user.userId}</td>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                            <td>{user.role}</td>
                                            <td>{user.createdAt}</td>
                                            <td>{user.updatedAt}</td>
                                            <td>
                                                <Button variant="primary" className="actions-btn" onClick={() => handleEdit(user)}>
                                                    Edit
                                                </Button>
                                                <Button variant="danger" className="actions-btn" onClick={() => handleEdit(user)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>

                            {/* Modal zur Bearbeitung des ausgewählten Benutzers anzeigen */}
                            {selectedUser && (
                                <EditUserModal user={selectedUser} show={showEditModal} handleClose={handleCloseEditModal} />
                            )}
                        </>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Users;
