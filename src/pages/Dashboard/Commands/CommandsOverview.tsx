import React, { useEffect, useState } from 'react';
import {Container, ListGroup, Form, Badge, Spinner, Alert} from 'react-bootstrap';
import {useLocation, useNavigate} from "react-router-dom";
import Command from "./Command";
import CommandItem from "./CommandItem";
import useFetchCommands from "./useFetchCommands";

function CommandsOverview() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialFilter = queryParams.get('filter') || 'all';
    const [filter, setFilter] = useState<string>(initialFilter);
    const [commands, loading, errorMessage, handleToggle] = useFetchCommands(filter, navigate);
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        params.set('filter', filter);
        navigate({ search: params.toString() }, { replace: true });
    }, [filter, navigate, location.search]);

    return (
        <Container>
            <h1 className="mb-4">CommandsOverview</h1>
            <Form.Select
                aria-label='Filter CommandsOverview'
                defaultValue={params.get('filter') || 'all'}
                onChange={(e) => setFilter(e.target.value)}
                className='mb-3'
                >
                <option value='all'>All</option>
                <option value='enabled'>Enabled</option>
                <option value='disabled'>Disabled</option>
            </Form.Select>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )  : errorMessage ? (
                <Alert variant="danger">{errorMessage}</Alert>
            ) : (
                <ListGroup>
                    {commands.map((command: Command) => (
                        <CommandItem key={command.id} command={command} handleToggle={handleToggle} />
                    ))}
                </ListGroup>
            )}
        </Container>
    );
}

export default CommandsOverview;
