/*import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createUsuarioAsync, getUsuarioAsync, updateUsuarioAsync } from "./usuariosSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button, Form } from "react-bootstrap";

function UsuariosEdit() {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const navigateTo = useNavigate()
    const usuario = useSelector((state: any) => state.usuarios.usuarioSelected);

    useEffect(() => {
        if (id) {
            setIsEdit(true)
            dispatch(getUsuarioAsync(id))
        }
        console.log(usuario);
    }, [id, dispatch])


    const handleEdit = (event: any) => {
        event.preventDefault()
        const payload = doPayload(event)
        console.log(payload);

        dispatch(updateUsuarioAsync(payload))

        navigateTo('/usuarios')

    }

    const handleCreate = (event: any) => {
        event.preventDefault()
        const payload = doPayload(event)
        dispatch(createUsuarioAsync(payload))
        console.log(payload);
        navigateTo('/usuarios')
    }

    const doPayload = (event: any) => {
        const { target } = event;

        let payload = {
            name: target.name.value,
            email: target.email.value,
            password: target.password.value,
            direccion: target.direccion.value,
            telefono: target.telefono.value,
            ...(isEdit ? { id } : {})
        }
        return payload
    }

    return (
        <>
            <Layout>
                {isEdit
                    ? <h2>Editar Usuario</h2>
                    : <h2>Crear Usuario</h2>
                }
                <Form autoComplete="off" onSubmit={isEdit ? handleEdit : handleCreate}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="name" name="name" placeholder="Nombre" defaultValue={isEdit ? usuario.name : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" autoComplete="email-edit" name="email" placeholder="Email" defaultValue={isEdit ? usuario.email : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" autoComplete="password-edit" name="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="direccion" name="direccion" placeholder="Dirección" defaultValue={isEdit ? usuario.direccion : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="telefono" name="telefono" placeholder="Teléfono" defaultValue={isEdit ? usuario.telefono : ''} />
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        {isEdit ? 'Editar' : 'Crear'}
                    </Button>
                </Form>
            </Layout>
        </>
    )
}

export default UsuariosEdit*/



import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Layout from "../layout/Layout";
import { createUsuarioAsync, getUsuarioAsync, updateUsuarioAsync } from "./usuariosSlice";
import styles from "./UsuariosEdit.module.css";
import loaderGif from '/images/loader.gif';

function UsuariosEdit() {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigateTo = useNavigate();
    const usuario = useSelector((state: any) => state.usuarios.usuarioSelected);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            dispatch(getUsuarioAsync(id)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id, dispatch]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = doPayload(event);
        if (isEdit) {
            dispatch(updateUsuarioAsync(payload));
        } else {
            dispatch(createUsuarioAsync(payload));
        }
        navigateTo('/usuarios');
    };

    const doPayload = (event: React.FormEvent<HTMLFormElement>) => {
        const target = event.target as typeof event.target & {
            name: { value: string };
            email: { value: string };
            password: { value: string };
            direccion: { value: string };
            telefono: { value: string };
        };

        return {
            name: target.name.value,
            email: target.email.value,
            password: target.password.value,
            direccion: target.direccion.value,
            telefono: target.telefono.value,
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
                <h1>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</h1>
                <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" defaultValue={isEdit ? usuario.name : ''} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" autoComplete="email-edit" defaultValue={isEdit ? usuario.email : ''} />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" autoComplete="password-edit" />

                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" defaultValue={isEdit ? usuario.direccion : ''} />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono" defaultValue={isEdit ? usuario.telefono : ''} />

                    <button type="submit" className={styles.btnSubmit}>
                        {isEdit ? 'Modificar Usuario' : 'Crear Usuario'}
                    </button>
                </form>

                <Link to="/usuarios" className={styles.btnVolver}>Volver al Listado</Link>
            </div>
        </Layout>
    );
}

export default UsuariosEdit;
