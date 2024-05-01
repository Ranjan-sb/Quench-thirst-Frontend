import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleLogout, isAuthenticated }) => {
    const navigate = useNavigate()
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">QT APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {!isAuthenticated ? (
                        <>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/">Login</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/account">Account</Nav.Link>
                            <Nav.Link as={Link} to="/price-details">Price Details</Nav.Link>
                            <NavDropdown title="More" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {
                                    handleLogout()
                                    navigate('/')
                                    
                                }}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
