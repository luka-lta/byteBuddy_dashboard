import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Form } from 'react-bootstrap';

interface Command {
    id: number;
    name: string;
    description: string;
    disabled: number;
}

function Commands() {
    const [commands, setCommands] = useState<Command[]>([]);

    useEffect(() => {
        fetch('http://localhost/api/v1/commands')
            .then(response => response.json())
            .then(data => setCommands(data.data));
    }, []);

    const getStatusVariant = (disabled: number) => {
        return disabled ? 'danger' : 'success'; // Hier kannst du die Farben je nach Bedarf anpassen
    };

    const handleToggle = (id: number) => {
        const updatedCommands = commands.map(command =>
            command.id === id ? { ...command, disabled: command.disabled ? 0 : 1 } : command
        );

        setCommands(updatedCommands);

        fetch(`http://localhost/api/v1/commands/toggle?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(data => console.log(data));
    };

    return (
        <Container>
            <h1 className="mb-4">Commands</h1>
            <ListGroup>
                {commands.map((command: Command) => (
                    <ListGroup.Item key={command.id}>
                        {command.name}
                        <span className={`badge ml-2 badge-${getStatusVariant(command.disabled)}`}>
                            {command.disabled ? 'Inactive' : 'Active'}
                        </span>
                        {command.description}
                        <Form.Check
                            type="switch"
                            id={`switch-${command.id}`}
                            checked={!command.disabled}
                            onChange={() => handleToggle(command.id)}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Commands;
