import Logout from '@/pages/logout';
import React from 'react';
import {
    Col,
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Row
} from 'reactstrap';

const Header = ({ user }) => {
    return (
        <header>
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand
                        href="/"
                        className="d-flex align-items-center mr-auto">
                        <strong>The Narator</strong>
                    </NavbarBrand>
                    {user ? <Logout/> : <></>}
                </Container>
            </Navbar>
            <NavbarToggler onClick={console.log('hi')} className="mr-2" />
        </header>
    );
};

export default Header;