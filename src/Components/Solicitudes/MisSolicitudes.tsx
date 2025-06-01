import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import {
    getMisSolicitudesAsync,
    resetSolicitud
} from "./solicitudesSlice";
import styles from "./Solicitudes.module.css";
import loaderGif from "/images/loader.gif";

function MisSolicitudes() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);
    const status = useSelector((state: any) => state.solicitudes.status);

    useEffect(() => {
        dispatch(resetSolicitud());
        dispatch(getMisSolicitudesAsync()); // <- llamada solo a las solicitudes del usuario
    }, [dispatch]);

    return (
        <Layout>
            <Container className={styles.container}>
                <div className={styles.tituloYBoton}>
                    <h1>Mis Solicitudes</h1>
                    <Link
                        className={`${styles.btn} ${styles.btnVer} ${styles.btnCrear}`}
                        to="/solicitudes/create"
                    >
                        Crear Solicitud
                    </Link>
                </div>

                {status === "loading" ? (
                    <div className={styles.loaderContainer}>
                        <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                    </div>
                ) : (
                    <div className={styles.solicitudesContainer}>
                        {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
                            solicitudes.map((solicitud: any, index: number) => (
                                <div key={solicitud.id} className={styles.solicitudCard}>
                                    <div className={styles.solicitudInfo}>
                                        <h2>Solicitud {index + 1}</h2>
                                        <p><strong>Mascota:</strong> {solicitud.mascota?.nombre}</p>
                                        <p>
                                            <strong>Fecha:</strong>{" "}
                                            {solicitud.fecha_solicitud
                                                ? new Date(solicitud.fecha_solicitud).toLocaleDateString("es-ES")
                                                : "No especificada"}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong>{" "}
                                            <span className={`${styles.estado} ${styles[solicitud.estado.toLowerCase()]}`}>
                                                {solicitud.estado}
                                            </span>
                                        </p>
                                        <div className={styles.acciones}>
                                            <Link className={`${styles.btn} ${styles.btnVer}`} to={`/solicitudes/see/${solicitud.id}`}>Ver Detalle</Link>
                                            <Link className={`${styles.btn} ${styles.btnEditar}`} to={`/solicitudes/edit/${solicitud.id}`}>Editar</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.mensajeVacio}>No tienes solicitudes registradas.</p>
                        )}
                    </div>
                )}
            </Container>
        </Layout>
    );
}

export default MisSolicitudes;
