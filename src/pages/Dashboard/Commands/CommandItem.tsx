import {ListGroup, Form, Badge} from 'react-bootstrap';
import Command from "./Command";

function CommandItem({ command, handleToggle }: { command: Command; handleToggle: (id: number) => void }) {
    const getStatusVariant = (disabled: number) => (disabled ? 'danger' : 'success');

    return (
        <ListGroup.Item key={command.id}>
            {command.name}
            <br />
            {command.description}
            <Form.Check
                type="switch"
                id={`switch-${command.id}`}
                checked={!command.disabled}
                onChange={() => handleToggle(command.id)}
            />
            <Badge bg={getStatusVariant(command.disabled)}>{command.disabled ? 'Inactive' : 'Active'}</Badge>
        </ListGroup.Item>
    );
}

export default CommandItem;

