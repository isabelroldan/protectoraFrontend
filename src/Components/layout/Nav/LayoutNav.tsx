import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../../login/loginSlice';
import styles from './LayoutNav.module.css';
import { ThunkDispatch } from '@reduxjs/toolkit';

function LayoutNav() {

    // Configuración de Redux para acciones asíncronas
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    // Verificación del token de sesión para control de autenticación
    const [token] = useState(sessionStorage.getItem("token"));

    // Rol del usuario que se logea
    const [rol] = useState(sessionStorage.getItem("rol"));

    // Manejo de cierre de sesión
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
                {/* <li className={styles.navItem}>
                    <Link
                        to="/solicitudes"
                        className={location.pathname === '/solicitudes' ? styles.active : ''}
                    >
                        Solicitudes
                    </Link>
                </li> */}

                <li className={styles.navItem}>
                    <Link
                        to={rol === "usuario" ? "/mis-solicitudes" : "/solicitudes"}
                        className={
                            location.pathname === "/solicitudes" || location.pathname === "/mis-solicitudes"
                                ? styles.active
                                : ""
                        }
                    >
                        Solicitudes
                    </Link>
                </li>


                {/* Mostrar solo si el rol NO es "usuario" */}
                {rol !== 'usuario' && (
                    <li className={styles.navItem}>
                        <Link
                            to="/usuarios"
                            className={location.pathname === '/usuarios' ? styles.active : ''}
                        >
                            Usuarios
                        </Link>
                    </li>
                )}

                {rol !== 'usuario' && (
                    <li className={styles.navItem}>
                        <Link to="/calendario" className={location.pathname === '/calendario' ? styles.active : ''}>
                            Calendario
                        </Link>
                    </li>
                )}

                {/* Opción de cierre de sesión, visible solo si hay un token */}
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

