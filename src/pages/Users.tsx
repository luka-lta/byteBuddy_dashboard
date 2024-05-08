import React, { useEffect, useState } from 'react';
import { Container, Spinner, Table, Button } from 'react-bootstrap';
import EditUserModal from '../modal/EditUserModal';
import { UserData } from '../interfaces/UserData';

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
        setTimeout(fetchUsers, 500); // Fetch users after modal closes
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Users</h1>
            {loading ? (
                <Spinner animation="border" role="status" className="text-light">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
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
                                    <Button variant="primary" onClick={() => handleEdit(user)}>
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    {/* Modal zur Bearbeitung des ausgewählten Benutzers anzeigen */}
                    {selectedUser && (
                        <EditUserModal user={selectedUser} show={showEditModal} handleClose={handleCloseEditModal} />
                    )}
                </>
            )}
        </Container>
    );
};

export default Users;
