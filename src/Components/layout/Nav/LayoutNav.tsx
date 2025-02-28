/*import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { logoutAsync } from '../../login/loginSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';


function LayoutNav() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const [token, setToken] = useState(sessionStorage.getItem("token"));

    const handleLogout = () => {
        dispatch(logoutAsync())
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to={"/"} >Protectora Mascotas</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/mascotas"}>Mascotas</Nav.Link>
                        <Nav.Link as={Link} to={"/solicitudes"}>Solicitudes</Nav.Link>
                        <Nav.Link as={Link} to={"/usuarios"}>Usuarios</Nav.Link>
                        {token
                            ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            : ''}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default LayoutNav*/


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../../login/loginSlice';
import styles from './LayoutNav.module.css';
import { ThunkDispatch } from '@reduxjs/toolkit';

function LayoutNav() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const [token] = useState(sessionStorage.getItem("token"));

    const handleLogout = () => {
        dispatch(logoutAsync())
    };

    return (
        <nav className={styles.navBar}>
            <Link to="/" className={styles.logo}>Pelitos y Bigotes</Link>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link
                        to="/mascotas"
                        className={location.pathname === '/mascotas' ? styles.active : ''}
                    >
                        Mascotas
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link
                        to="/solicitudes"
                        className={location.pathname === '/solicitudes' ? styles.active : ''}
                    >
                        Solicitudes
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link
                        to="/usuarios"
                        className={location.pathname === '/usuarios' ? styles.active : ''}
                    >
                        Usuarios
                    </Link>
                </li>

                {token && (
                    <li className={styles.navItem}>
                        <a href="#" onClick={handleLogout}>Logout</a>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default LayoutNav;

