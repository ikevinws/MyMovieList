import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.scss';
import { useAuthContext } from '../../contexts/AuthContext';
import { signOutUser } from '../../actions/User';

const AppNavbar = () => {
    const { isAuth, setIsAuth } = useAuthContext();
    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            if (isAuth) {
                const res = await signOutUser();
                if (res.status === 200) {
                    setIsAuth(false);
                }
            }
        } catch {
            alert('An error has occured. Please try again.');
        }
    };
    return (
        <Navbar expand="sm" sticky="top" variant="dark">
            <Navbar.Brand className="ml-md-2 ml-lg-3" href="/">
                MyMovieList
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto mr-md-2  mr-lg-3">
                    <Nav.Link href="/movies/new">Add Movie</Nav.Link>
                    {isAuth ? null : (
                        <>
                            <Nav.Link href="/signin">Sign In</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </>
                    )}
                    {isAuth ? (
                        <Nav.Link href="/signout" onClick={handleSignOut}>
                            Sign Out
                        </Nav.Link>
                    ) : null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
