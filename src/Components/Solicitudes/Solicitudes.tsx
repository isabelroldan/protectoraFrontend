/*import { Button, ButtonGroup, Container, Modal, Table } from "react-bootstrap"
import Layout from "../layout/Layout"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { deleteSolicitudAsync, getSolicitudesAsync, resetSolicitud } from "./solicitudesSlice";


function Solicitudes() {
    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);
    useEffect(() => {
        dispatch(resetSolicitud());
        dispatch(getSolicitudesAsync())
        console.log(solicitudes);
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
        dispatch(deleteSolicitudAsync(deleteId))
        setShow(false)
    }

    return (
        <Layout>
            <Container>
                <h2>Listado de Solicitudes</h2>
                <Link className="btn btn-secondary" role="button" to={`/solicitudes/create`}> Crear </Link>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>ATENCION!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirme que desea eliminar la mascota</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete()}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
                {solicitudes === ""
                    ? <p>Cargando...</p>
                    : <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Estado</th>
                                <th>Fecha Solicitud</th>
                                <th>Nombre Mascota</th>
                                <th>Nombre Usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((solicitud: any) => {
                                return (<tr>
                                    <td>{solicitud.id}</td>
                                    <td>{solicitud.estado}</td>
                                    <td>{solicitud.fecha_solicitud}</td>
                                    <td>{solicitud.mascota?.nombre}</td>
                                    <td>{solicitud.usuario?.name}</td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            <Link className="btn btn-secondary" role="button" to={`/solicitudes/see/${solicitud.id}`}> Ver </Link>
                                            <Link className="btn btn-secondary" role="button" to={`/solicitudes/edit/${solicitud.id}`}> Editar </Link>
                                            <Button onClick={() => handleShow(solicitud.id)} variant="secondary">Eliminar</Button>
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

export default Solicitudes
*/


import { useEffect, useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { deleteSolicitudAsync, getSolicitudesAsync, resetSolicitud } from "./solicitudesSlice";
import styles from "./Solicitudes.module.css";
import loaderGif from '/images/loader.gif';

function Solicitudes() {
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);

    useEffect(() => {
        dispatch(resetSolicitud());
        dispatch(getSolicitudesAsync());
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
        dispatch(deleteSolicitudAsync(deleteId));
        setShow(false);
    };

    return (
        <Layout>
            <Container className={styles.container}>
                <h1>Listado de Solicitudes de Adopción</h1>
                <Link className={`${styles.btn} ${styles.btnSubmit}`} to="/solicitudes/create">
                    Crear Nueva Solicitud
                </Link>

                <div className={styles.solicitudesContainer}>
                    {solicitudes === "" ? (
                        <div className={styles.loaderContainer}>
                            <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                        </div>
                    ) : solicitudes.length === 0 ? (
                        <p>No hay solicitudes registradas.</p>
                    ) : (
                        solicitudes.map((solicitud: any) => (
                            <div key={solicitud.id} className={styles.solicitudCard}>
                                <div className={styles.solicitudInfo}>
                                    <h2>Solicitud #{solicitud.id}</h2>
                                    <p><strong>Usuario:</strong> {solicitud.usuario?.name || 'Usuario no disponible'}</p>
                                    <p><strong>Mascota:</strong> {solicitud.mascota?.nombre}</p>
                                    <p><strong>Fecha:</strong> {new Date(solicitud.fecha_solicitud).toLocaleDateString()}</p>
                                    <p><strong>Estado:</strong> {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}</p>
                                    <div className={styles.acciones}>
                                        <Link className={`${styles.btn} ${styles.btnVer}`} to={`/solicitudes/see/${solicitud.id}`}>Ver Detalle</Link>
                                        <Link className={`${styles.btn} ${styles.btnEditar}`} to={`/solicitudes/edit/${solicitud.id}`}>Editar</Link>
                                        <button className={`${styles.btn} ${styles.btnBorrar}`} onClick={() => handleShow(solicitud.id)}>Borrar</button>
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
                    <Modal.Body>Confirme que desea eliminar la solicitud</Modal.Body>
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

export default Solicitudes;
