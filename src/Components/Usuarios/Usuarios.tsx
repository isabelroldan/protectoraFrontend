/*import { Button, ButtonGroup, Container, Modal, Table } from "react-bootstrap"
import Layout from "../layout/Layout"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { deleteUsuarioAsync, getUsuariosAsync, resetUsuario } from "./usuariosSlice";
import { Link } from "react-router-dom";


function Usuarios() {
    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);
    useEffect(() => {
        dispatch(resetUsuario());
        dispatch(getUsuariosAsync())
        console.log(usuarios);
    }, [dispatch])

    const handleClose = () => {
        setDeleteId("")
        setShow(false)
    };
    const handleShow = (id: string) => {
        setDeleteId(id)
        setShow(true)
    };
    const handleDelete = () => {
        console.log(`has pulsado el botón eliminar para el id: ${deleteId}`)
        dispatch(deleteUsuarioAsync(deleteId))
        setShow(false)
    }

    return (
        <Layout>
            <Container>
                <h2>Listado de usuarios</h2>
                <Link className="btn btn-secondary" role="button" to={`/usuarios/create`}> Crear </Link>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>ATENCION!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirme que desea eliminar el usuario</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete()}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
                {usuarios === ""
                    ? <p>Cargando...</p>
                    : <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Contraseña</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario: any) => {
                                return (<tr>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.name}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.password}</td>
                                    <td>{usuario.direccion}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            <Link className="btn btn-secondary" role="button" to={`/usuarios/see/${usuario.id}`}> Ver </Link>
                                            <Link className="btn btn-secondary" role="button" to={`/usuarios/edit/${usuario.id}`}> Editar </Link>
                                            <Button onClick={() => handleShow(usuario.id)} variant="secondary">Eliminar</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                }
            </Container>
        </Layout>
    )
}

export default Usuarios
*/

import React, { useEffect, useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { deleteUsuarioAsync, getUsuariosAsync, resetUsuario } from "./usuariosSlice";
import styles from "./Usuarios.module.css";
import loaderGif from '/images/loader.gif';

function Usuarios() {
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);

    useEffect(() => {
        dispatch(resetUsuario());
        dispatch(getUsuariosAsync());
    }, [dispatch]);

    const handleClose = () => {
        setDeleteId("");
        setShow(false);
    };

    const handleShow = (id: string) => {
        setDeleteId(id);
        setShow(true);
    };

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
