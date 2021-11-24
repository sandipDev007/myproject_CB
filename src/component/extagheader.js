import React from 'react';
import './header.css';
import { Container,Navbar } from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Container fluid className="p-0">
                    <Navbar collapseOnSelect expand="lg" bg="none">
                            <Navbar.Brand href="/extags" className="brand"><img src={require('../assest/images/logo.png')} className="img-fluid" alt="logo" /></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                {/* <Nav className="ml-auto">
                                    <Nav.Link href="">About</Nav.Link>
                                    <Nav.Link href="">How it works?</Nav.Link>
                                </Nav> */}
                            </Navbar.Collapse>
                        </Navbar>   
                </Container>
            </div>
        );
    }
}

export default Header;