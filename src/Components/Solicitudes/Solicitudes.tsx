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
    // Estados locales para manejar el modal de confirmación de eliminación
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    // Obtiene la lista de solicitudes del estado de Redux
    const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);

    // Efecto para cargar las solicitudes al montar el componente
    useEffect(() => {
        dispatch(resetSolicitud());
        dispatch(getSolicitudesAsync());
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

    // Función para eliminar una solicitud
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
                        // Mapea y renderiza cada solicitud
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

                {/* Modal de confirmación para eliminar solicitud */}
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
