import React, { useState } from 'react';
import { Button, Collapse, Nav } from 'react-bootstrap';

function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="d-flex">
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="sidebar-content"
                aria-expanded={open}
                variant="primary"
                className="m-3"
            >
                {open ? 'Hide Sidebar' : 'Show Sidebar'}
            </Button>
            <Collapse in={open}>
                <div id="sidebar-content" className="bg-light border" style={{ width: '250px' }}>
                    <Nav className="flex-column p-3">
                        <Nav.Link href="#">Dashboard</Nav.Link>
                        <Nav.Link href="#">Profile</Nav.Link>
                        <Nav.Link href="#">Settings</Nav.Link>
                        <Nav.Link href="#">Logout</Nav.Link>
                    </Nav>
                </div>
            </Collapse>
        </div>
    );
}

export default Sidebar;