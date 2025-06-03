import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Layout from "../layout/Layout";
import {
    createUsuarioAsync,
    getUsuarioAsync,
    updateUsuarioAsync,
} from "./usuariosSlice";
import styles from "./UsuariosEdit.module.css";
import loaderGif from "/images/loader.gif";
import toast from "react-hot-toast";

function UsuariosEdit() {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [esAdmin, setEsAdmin] = useState(false); // Nuevo estado para el rol
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

    useEffect(() => {
        if (isEdit && usuario?.rol) {
            setEsAdmin(usuario.rol !== "usuario"); // Activar switch si el rol es distinto a 'usuario'
        }
    }, [isEdit, usuario]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Estado esAdmin al enviar:", esAdmin);
        const payload = doPayload(event, esAdmin); // ✅ pasar esAdmin explícitamente

        try {
            if (isEdit) {
                await dispatch(updateUsuarioAsync(payload)).unwrap();
                toast.success("Usuario actualizado correctamente");
            } else {
                await dispatch(createUsuarioAsync(payload)).unwrap();
                toast.success("Usuario creado correctamente");
            }
            navigateTo("/usuarios");
        } catch (error) {
            toast.error("Error al procesar el usuario");
            console.error("Error:", error);
        }
    };


    const doPayload = (
        event: React.FormEvent<HTMLFormElement>,

        esAdminChecked: boolean // ✅ se pasa como argumento
    ) => {
        console.log("Rol que se enviará:", esAdminChecked ? "admin" : "usuario");

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
            rol: esAdminChecked ? "admin" : "usuario", // ✅ ahora sí refleja el estado real
            ...(isEdit ? { id } : {}),
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
                <h1>{isEdit ? "Editar Usuario" : "Crear Usuario"}</h1>
                <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={isEdit ? usuario.name : ""}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email-edit"
                        defaultValue={isEdit ? usuario.email : ""}
                    />

                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="password-edit"
                    />

                    <label htmlFor="direccion">Dirección:</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        defaultValue={isEdit ? usuario.direccion : ""}
                    />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        defaultValue={isEdit ? usuario.telefono : ""}
                    />

                    <div className={styles.switchContainer}>
                        <span>¿Es administrador?</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                id="rolSwitch"
                                checked={esAdmin}
                                onChange={() => setEsAdmin((prev) => !prev)}
                            // disabled={!isEdit}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>


                    <button type="submit" className={styles.btnSubmit}>
                        {isEdit ? "Modificar Usuario" : "Crear Usuario"}
                    </button>
                </form>

                <Link to="/usuarios" className={styles.btnVolver}>
                    Volver al Listado
                </Link>
            </div>
        </Layout>
    );
}

export default UsuariosEdit;
