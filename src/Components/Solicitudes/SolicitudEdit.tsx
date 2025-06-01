import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Layout from "../layout/Layout";
import { createSolicitudAsync, getSolicitudAsync, updateSolicitudAsync } from "./solicitudesSlice";
import { getAllUsuariosAsync } from "../Usuarios/usuariosSlice";
import styles from "./SolicitudEdit.module.css";
import loaderGif from '/images/loader.gif';
import toast from "react-hot-toast";
import { getAllMascotasAsync } from "../Mascotas/mascotasSlice";

function SolicitudEdit() {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigateTo = useNavigate();

    const solicitud = useSelector((state: any) => state.solicitudes.solicitudSelected);
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);
    const [loading, setLoading] = useState(true);

    const [rol] = useState(sessionStorage.getItem("rol"));
    const [usuarioId] = useState(sessionStorage.getItem("id"));

    const usuarioActual = usuarios.find((u: any) => Number(u.id) === Number(usuarioId));

    useEffect(() => {
        dispatch(getAllMascotasAsync());
        dispatch(getAllUsuariosAsync());
        if (id) {
            setIsEdit(true);
            dispatch(getSolicitudAsync(id)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id, dispatch]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = doPayload(event);

        try {
            if (isEdit) {
                await dispatch(updateSolicitudAsync(payload)).unwrap();
                toast.success("Solicitud actualizada correctamente");
            } else {
                await dispatch(createSolicitudAsync(payload)).unwrap();
                toast.success("Solicitud creada correctamente");
            }

            // Redirección según el rol
            navigateTo(rol === "usuario" ? "/mis-solicitudes" : "/solicitudes");
        } catch (error) {
            toast.error("Error al procesar la solicitud");
            console.error("Error:", error);
        }
    };

    const doPayload = (event: React.FormEvent<HTMLFormElement>) => {
        const target = event.target as typeof event.target & {
            estado: { value: string };
            fecha_solicitud: { value: string };
            comentario: { value: string };
            mascota_id: { value: string };
            usuario_id: { value: string };
        };

        return {
            estado: target.estado.value,
            fecha_solicitud: target.fecha_solicitud.value,
            comentario: target.comentario.value,
            mascota_id: target.mascota_id.value,
            usuario_id: target.usuario_id.value,
            ...(isEdit ? { id } : {})
        };
    };

    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
            </div>
        );
    }

    return (
        <Layout>
            <div className={styles.formContainer}>
                <h1>{isEdit ? 'Editar Solicitud' : 'Crear Solicitud'}</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="estado">Estado:</label>
                    <select id="estado" name="estado" defaultValue={isEdit ? solicitud.estado : 'pendiente'}>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                    </select>

                    <label htmlFor="fecha_solicitud">Fecha de la Solicitud:</label>
                    <input type="date" id="fecha_solicitud" name="fecha_solicitud" defaultValue={isEdit ? solicitud.fecha_solicitud : ''} />

                    <label htmlFor="comentario">Comentario:</label>
                    <textarea id="comentario" name="comentario" rows={3} defaultValue={isEdit ? solicitud.comentario : ''} />

                    <label htmlFor="mascota_id">Mascota:</label>
                    <select id="mascota_id" name="mascota_id" defaultValue={isEdit ? solicitud.mascota_id : ''}>
                        <option value="">Seleccione una mascota</option>
                        {Array.isArray(mascotas) && mascotas.map((mascota: any) => (
                            <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
                        ))}
                    </select>

                    {rol === "usuario" ? (
                        <>
                            <label>Usuario:</label>
                            <input
                                type="text"
                                value={usuarioActual ? usuarioActual.name : ''}
                                disabled
                                className={styles.inputDisabled}
                            />
                            <input type="hidden" name="usuario_id" value={usuarioId || ''} />
                        </>
                    ) : (
                        <>
                            <label htmlFor="usuario_id">Usuario:</label>
                            <select id="usuario_id" name="usuario_id" defaultValue={isEdit ? solicitud.usuario_id : ''}>
                                <option value="">Seleccione un usuario</option>
                                {Array.isArray(usuarios) && usuarios.map((usuario: any) => (
                                    <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
                                ))}
                            </select>
                        </>
                    )}

                    <button type="submit" className={styles.btnSubmit}>
                        {isEdit ? 'Modificar Solicitud' : 'Crear Solicitud'}
                    </button>
                </form>

                <Link
                    to={rol === "usuario" ? "/mis-solicitudes" : "/solicitudes"}
                    className={styles.btnVolver}
                >
                    Volver al Listado
                </Link>
            </div>
        </Layout>
    );
}

export default SolicitudEdit;
