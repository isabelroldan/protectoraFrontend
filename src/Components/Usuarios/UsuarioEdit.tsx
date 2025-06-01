import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Layout from "../layout/Layout";
import { createUsuarioAsync, getUsuarioAsync, updateUsuarioAsync } from "./usuariosSlice";
import styles from "./UsuariosEdit.module.css";
import loaderGif from '/images/loader.gif';
import toast from "react-hot-toast";

function UsuariosEdit() {
    // Obtiene el Id del usuario de los parámetros de la URL
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false); // Estado para determinar si es edición o creación
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigateTo = useNavigate();
    // Obtiene el usuario seleccionado del estado de Redux
    const usuario = useSelector((state: any) => state.usuarios.usuarioSelected);
    const [loading, setLoading] = useState(true);

    // Efecto para cargar los datos del usuario si es una edición
    useEffect(() => {
        if (id) {
            setIsEdit(true);
            dispatch(getUsuarioAsync(id)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id, dispatch]);

    // Maneja el envío del formulario
    /* const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = doPayload(event);
        if (isEdit) {
            dispatch(updateUsuarioAsync(payload));
        } else {
            dispatch(createUsuarioAsync(payload));
        }
        navigateTo('/usuarios');
    }; */

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = doPayload(event);

    try {
        if (isEdit) {
            await dispatch(updateUsuarioAsync(payload)).unwrap();
            toast.success("Usuario actualizado correctamente");
        } else {
            await dispatch(createUsuarioAsync(payload)).unwrap();
            toast.success("Usuario creado correctamente");
        }

        navigateTo('/usuarios');
    } catch (error) {
        toast.error("Error al procesar el usuario");
        console.error("Error:", error);
    }
};


    // Prepara el payload para enviar al backend
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
