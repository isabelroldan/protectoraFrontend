import { useEffect, useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { deleteUsuarioAsync, getUsuariosAsync, resetUsuario } from "./usuariosSlice";
import styles from "./Usuarios.module.css";
import loaderGif from '/images/loader.gif';

function Usuarios() {
    // Estados locales para manejar el modal de confirmación de eliminación
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    // Obtiene la lista de usuarios del estado de Redux
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);

    // Efecto para cargar los usuarios al montar el componente
    useEffect(() => {
        dispatch(resetUsuario());
        dispatch(getUsuariosAsync());
    }, [dispatch]);

    // Funciones para manejar el modal de confirmación de eliminación
    const handleClose = () => {
        setDeleteId("");
        setShow(false);
    };

    const handleShow = (id: string) => {
        setDeleteId(id);
        setShow(true);
    };

    // Función para eliminar un usuario
    const handleDelete = () => {
        dispatch(deleteUsuarioAsync(deleteId));
        setShow(false);
    };

    return (
        <Layout>
            <Container className={styles.container}>
                <h1>Listado de Usuarios</h1>
                <Link className={`${styles.btn} ${styles.btnVer} ${styles.btnCrear}`} to="/usuarios/create">
                    Crear Usuario
                </Link>

                <div className={styles.usuariosContainer}>
                    {usuarios === "" ? (
                        <div className={styles.loaderContainer}>
                            <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                        </div>
                    ) : (
                        usuarios.map((usuario: any) => (
                            <div key={usuario.id} className={styles.usuarioCard}>
                                <div className={styles.usuarioImgContainer}>
                                    <img
                                        src="/images/persona.jpg"
                                        alt="Usuario"
                                        className={styles.usuarioImg}
                                    />
                                </div>
                                <div className={styles.usuarioInfo}>
                                    <h2>{usuario.name}</h2>
                                    <p><strong>Email:</strong> {usuario.email}</p>
                                    <p><strong>Dirección:</strong> {usuario.direccion}</p>
                                    <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                                    <div className={styles.acciones}>
                                        <Link className={`${styles.btn} ${styles.btnVer}`} to={`/usuarios/see/${usuario.id}`}>Ver Detalle</Link>
                                        <Link className={`${styles.btn} ${styles.btnEditar}`} to={`/usuarios/edit/${usuario.id}`}>Editar</Link>
                                        <button className={`${styles.btn} ${styles.btnBorrar}`} onClick={() => handleShow(usuario.id)}>Borrar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>ATENCIÓN!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirme que desea eliminar el usuario</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Layout>
    );
}

export default Usuarios;
