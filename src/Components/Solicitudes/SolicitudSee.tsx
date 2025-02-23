import { useParams } from "react-router-dom";
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
