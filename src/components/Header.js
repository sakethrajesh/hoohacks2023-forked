import Logout from '@/pages/logout';
import React from 'react';
import {
    Col,
    Collapse,
    Container,
    NavbarToggler,
    NavbarBrand,
    Row
} from 'reactstrap';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({ user }) => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" className='pb-3'>
                <Container>
                    <Navbar.Brand
                        href="/"
                        className="d-flex align-items-center mr-auto">
                        The Narator
                    </Navbar.Brand>
                    {user ? <Logout/> : <></>}
                </Container>
            </Navbar>
            <NavbarToggler onClick={console.log('hi')} className="mr-2" />
        </header>
    );
};

export default Header;