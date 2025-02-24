/*import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button, Form } from "react-bootstrap";
import { createSolicitudAsync, getSolicitudAsync, updateSolicitudAsync } from "./solicitudesSlice";
import { getUsuariosAsync } from "../Usuarios/usuariosSlice";
import { getMascotasAsync } from "../Mascotas/mascotasSlice";

function SolicitudEdit() {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const navigateTo = useNavigate()
    const solicitud = useSelector((state: any) => state.solicitudes.solicitudSelected);
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);

    useEffect(() => {
        dispatch(getUsuariosAsync())
        dispatch(getMascotasAsync())
        if (id) {
            setIsEdit(true)
            dispatch(getSolicitudAsync(id))
        }
        console.log(solicitud);
    }, [id, dispatch])


    const handleEdit = (event: any) => {
        event.preventDefault()
        const payload = doPayload(event)
        console.log(payload);

        dispatch(updateSolicitudAsync(payload))

        navigateTo('/solicitudes')

    }

    const handleCreate = (event: any) => {
        event.preventDefault()
        const payload = doPayload(event)
        dispatch(createSolicitudAsync(payload))
        console.log(payload);
        navigateTo('/solicitudes')
    }

    const doPayload = (event: any) => {
        const { target } = event;

        let payload = {
            estado: target.estado.value,
            fecha_solicitud: target.fecha_solicitud.value,
            comentario: target.comentario.value,
            mascota_id: target.mascota_id.value,
            usuario_id: target.usuario_id.value,
            ...(isEdit ? { id } : {})
        }
        return payload
    }

    return (
        <>
            <Layout>
                {isEdit
                    ? <h2>Editar Mascota</h2>
                    : <h2>Crear Mascota</h2>
                }
                <Form onSubmit={isEdit ? handleEdit : handleCreate}>
                    <Form.Group className="mb-3" controlId="formBasicEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="estado" name="estado" placeholder="Estado" defaultValue={isEdit ? solicitud.estado : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFechaSolicitud">
                        <Form.Label>Fecha de la Solicitud</Form.Label>
                        <Form.Control type="fecha_solicitud" name="fecha_solicitud" placeholder="Fecha de solicitud" defaultValue={isEdit ? solicitud.fecha_solicitud : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicComentario">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control type="comentario" name="comentario" placeholder="Comentario" defaultValue={isEdit ? solicitud.comentario : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicMascota">
                        <Form.Label>Mascota</Form.Label>
                        <Form.Select name="mascota_id">
                            <option>Seleccione</option>
                            {Array.isArray(mascotas) ? mascotas.map((mascota: any) => {
                                return (mascota.id == solicitud.mascota_id
                                    ? <option selected value={mascota.id}>{mascota.nombre}</option>
                                    : <option value={mascota.id}>{mascota.nombre}</option>)
                            }) : ''}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUsuario">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Select name="usuario_id">
                            <option>Seleccione</option>
                            {Array.isArray(usuarios) ? usuarios.map((usuario: any) => {
                                return (usuario.id == solicitud.usuario_id
                                    ? <option selected value={usuario.id}>{usuario.name}</option>
                                    : <option value={usuario.id}>{usuario.name}</option>)
                            }) : ''}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        {isEdit ? 'Editar' : 'Crear'}
                    </Button>
                </Form>
            </Layout>
        </>
    )
}

export default SolicitudEdit
*/

import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Layout from "../layout/Layout";
import { createSolicitudAsync, getSolicitudAsync, updateSolicitudAsync } from "./solicitudesSlice";
import { getUsuariosAsync } from "../Usuarios/usuariosSlice";
import { getMascotasAsync } from "../Mascotas/mascotasSlice";
import styles from "./SolicitudEdit.module.css";
import loaderGif from '/images/loader.gif';

function SolicitudEdit() {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigateTo = useNavigate();
    const solicitud = useSelector((state: any) => state.solicitudes.solicitudSelected);
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getUsuariosAsync());
        dispatch(getMascotasAsync());
        if (id) {
            setIsEdit(true);
            dispatch(getSolicitudAsync(id)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id, dispatch]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = doPayload(event);
        if (isEdit) {
            dispatch(updateSolicitudAsync(payload));
        } else {
            dispatch(createSolicitudAsync(payload));
        }
        navigateTo('/solicitudes');
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

                    <label htmlFor="usuario_id">Usuario:</label>
                    <select id="usuario_id" name="usuario_id" defaultValue={isEdit ? solicitud.usuario_id : ''}>
                        <option value="">Seleccione un usuario</option>
                        {Array.isArray(usuarios) && usuarios.map((usuario: any) => (
                            <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
                        ))}
                    </select>

                    <button type="submit" className={styles.btnSubmit}>
                        {isEdit ? 'Modificar Solicitud' : 'Crear Solicitud'}
                    </button>
                </form>

                <Link to="/solicitudes" className={styles.btnVolver}>Volver al Listado</Link>
            </div>
        </Layout>
    );
}

export default SolicitudEdit;
