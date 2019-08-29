import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import {NavLink} from 'react-router-dom';


const Header = ({onLogout}) => {
    return (
        <Navbar bg="light" variant="light" style={{width:'80%', margin:'auto', marginBottom: '30px'}}>
            <Nav defaultActiveKey="/home" as="ul">
                <Nav.Item as="li">
                    <Nav.Link tag={NavLink} href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link tag={NavLink} href="/register">Register</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link href="/assign-dates">Assign Dates to Team member</Nav.Link>
                </Nav.Item> */}
                <Nav.Item as="li">
                    <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}




export default Header;