import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Layout from "../layout/Layout";
import { createMascotaAsync, getMascotaAsync, updateMascotaAsync } from "./mascotasSlice";
import styles from "./MascotasEdit.module.css";
import loaderGif from '/images/loader.gif';
import toast from "react-hot-toast";

function MascotasEdit() {
    const { id } = useParams(); // Obtiene el ID de la mascota de los parámetros de la URL
    const [isEdit, setIsEdit] = useState(false); // Estado para determinar si es edición o creación
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigateTo = useNavigate();
    const mascota = useSelector((state: any) => state.mascotas.mascotaSelected); // Obtiene la mascota seleccionada del estado de Redux
    const [loading, setLoading] = useState(true);

    // Efecto para cargar los datos de la mascota si es una edición
    useEffect(() => {
        if (id) {
            setIsEdit(true);
            dispatch(getMascotaAsync(id)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id, dispatch]);

    // Maneja el envío del formulario
    /* const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = doPayload(event);
        if (isEdit) {
            dispatch(updateMascotaAsync(payload));
        } else {
            dispatch(createMascotaAsync(payload));
        }
        navigateTo('/mascotas');
    }; */

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = doPayload(event);

        try {

            if (isEdit) {
                await dispatch(updateMascotaAsync(payload));
                toast.success("Mascota actualizada correctamente");
            } else {
                await dispatch(createMascotaAsync(payload));
                toast.success("Mascota creada correctamente");
            }
        } catch (error) {
            toast.error("Error al procesar la solicitud");
            console.error("Error:", error);
        }


        navigateTo('/mascotas');
    };


    // Prepara el payload para enviar al backend
    const doPayload = (event: React.FormEvent<HTMLFormElement>) => {
        const target = event.target as typeof event.target & {
            nombre: { value: string };
            especie: { value: string };
            raza: { value: string };
            edad: { value: string };
            descripcion: { value: string };
            estado: { value: string };
        };

        return {
            nombre: target.nombre.value,
            especie: target.especie.value,
            raza: target.raza.value,
            edad: target.edad.value,
            descripcion: target.descripcion.value,
            estado: target.estado.value,
            ...(isEdit ? { id } : {})
        };
    };

    // Muestra un loader mientras se cargan los datos
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
                <h1>{isEdit ? 'Editar Mascota' : 'Crear Mascota'}</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" defaultValue={isEdit ? mascota.nombre : ''} />

                    <label htmlFor="especie">Especie:</label>
                    <input type="text" id="especie" name="especie" defaultValue={isEdit ? mascota.especie : ''} />

                    <label htmlFor="raza">Raza:</label>
                    <input type="text" id="raza" name="raza" defaultValue={isEdit ? mascota.raza : ''} />

                    <label htmlFor="edad">Edad:</label>
                    <input type="number" id="edad" name="edad" defaultValue={isEdit ? mascota.edad : ''} />

                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea id="descripcion" name="descripcion" rows={3} defaultValue={isEdit ? mascota.descripcion : ''} />

                    <label htmlFor="estado">Estado:</label>
                    <select id="estado" name="estado" defaultValue={isEdit ? mascota.estado : ''}>
                        <option value="disponible">disponible</option>
                        <option value="adoptado">adoptado</option>
                        <option value="en proceso de adopción">en proceso de adopción</option>
                    </select>


                    <button type="submit" className={styles.btnSubmit}>
                        {isEdit ? 'Modificar Mascota' : 'Crear Mascota'}
                    </button>
                </form>

                <Link to="/mascotas" className={styles.btnVolver}>Volver al Listado</Link>
            </div>
        </Layout>
    );
}

export default MascotasEdit;

