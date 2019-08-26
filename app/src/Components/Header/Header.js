import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';


const Header = ({onLogout}) => {
    return (
        <Container>
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/assign-dates">Assign Dates to Team member</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
    )
}




export default Header;