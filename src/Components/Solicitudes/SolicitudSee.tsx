/*import { useParams } from "react-router-dom";
import Layout from "../layout/Layout"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function SolicitudSee() {
    const { id } = useParams();
    const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);
    const [solicitud, setSolicitud] = useState()
    useEffect(() => {
        if (id) {
            if (solicitud) {
                setSolicitud(undefined)
            }
            const solicitudSelected = solicitudes.find((solicitud: any) => solicitud.id == id);

            setSolicitud(solicitudSelected)
            console.log(solicitud);
        }
    }, [])
    return (
        <>
            <Layout>
                {(!solicitud)
                    ? <p>Cargando...</p>
                    : <div>
                        <p>Estado: {solicitud.estado}</p>
                        <p>Fecha de solicitud: {solicitud.fecha_solicitud}</p>
                        <p>Comentario: {solicitud.comentario}</p>
                        <p>Nombre Mascota: {solicitud.mascota?.nombre}</p>
                        <p>Nombre Usuario: {solicitud.usuario?.name}</p>
                    </div>
                }

            </Layout>
        </>
    )
}

export default SolicitudSee
*/

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
import styles from "./SolicitudSee.module.css";
import loaderGif from '/images/loader.gif';

function SolicitudSee() {
    const { id } = useParams();
    const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);
    const [solicitud, setSolicitud] = useState<any>();

    useEffect(() => {
        if (id) {
            const solicitudSelected = solicitudes.find((s: any) => s.id == id);
            setSolicitud(solicitudSelected);
        }
    }, [id, solicitudes]);

    return (
        <Layout>
            <div className={styles.detalleSolicitudContainer}>
                <h1>Detalle de Solicitud</h1>
                {!solicitud ? (
                    <div className={styles.loaderContainer}>
                        <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                    </div>
                ) : (
                    <div className={styles.detalleSolicitudCard}>
                        <div className={styles.detalleSolicitudInfo}>
                            <h2>Solicitud #{solicitud.id}</h2>
                            <p><strong>Estado:</strong> {solicitud.estado}</p>
                            <p><strong>Fecha de solicitud:</strong> {new Date(solicitud.fecha_solicitud).toLocaleDateString()}</p>
                            <p><strong>Comentario:</strong> {solicitud.comentario}</p>
                            <p>
                                <strong>Mascota:</strong>{' '}
                                <Link to={`/mascotas/see/${solicitud.mascota?.id}`} className={styles.link}>
                                    {solicitud.mascota?.nombre}
                                </Link>
                            </p>
                            <p>
                                <strong>Usuario:</strong>{' '}
                                <Link to={`/usuarios/see/${solicitud.usuario?.id}`} className={styles.link}>
                                    {solicitud.usuario?.name}
                                </Link>
                            </p>
                        </div>
                    </div>
                )}
                <Link to="/solicitudes" className={styles.btnVolver}>Volver al Listado</Link>
            </div>
        </Layout>
    );
}

export default SolicitudSee;

