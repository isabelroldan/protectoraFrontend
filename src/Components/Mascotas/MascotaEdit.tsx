/*import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createMascotaAsync, getMascotaAsync, updateMascotaAsync } from "./mascotasSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button, Form } from "react-bootstrap";

function MascotasEdit() {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const navigateTo = useNavigate()
    const mascota = useSelector((state: any) => state.mascotas.mascotaSelected);

    useEffect(() => {
        if (id) {
            setIsEdit(true)
            dispatch(getMascotaAsync(id))
        }
        console.log(mascota);
    }, [id, dispatch])


    const handleEdit = (event: any) => {
        event.preventDefault()
        const payload = doPayload(event)
        console.log(payload);

        dispatch(updateMascotaAsync(payload))

        navigateTo('/mascotas')

    }

    const handleCreate = (event: any) => {
        event.preventDefault()
        const payload = doPayload(event)
        dispatch(createMascotaAsync(payload))
        console.log(payload);
        navigateTo('/mascotas')
    }

    const doPayload = (event: any) => {
        const { target } = event;

        let payload = {
            nombre: target.nombre.value,
            especie: target.especie.value,
            raza: target.raza.value,
            edad: target.edad.value,
            descripcion: target.descripcion.value,
            estado: target.estado.value,
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
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="nombre" name="nombre" placeholder="Nombre" defaultValue={isEdit ? mascota.nombre : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEspecie">
                        <Form.Label>Especie</Form.Label>
                        <Form.Control type="especie" name="especie" placeholder="Especie" defaultValue={isEdit ? mascota.especie : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicRaza">
                        <Form.Label>Raza</Form.Label>
                        <Form.Control type="raza" name="raza" placeholder="Raza" defaultValue={isEdit ? mascota.raza : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEdad">
                        <Form.Label>Edad</Form.Label>
                        <Form.Control type="edad" name="edad" placeholder="Edad" defaultValue={isEdit ? mascota.edad : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="descripcion" name="descripcion" placeholder="Descripción" defaultValue={isEdit ? mascota.descripcion : ''} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="estado" name="estado" placeholder="Estado" defaultValue={isEdit ? mascota.estado : ''} />
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        {isEdit ? 'Editar' : 'Crear'}
                    </Button>
                </Form>
            </Layout>
        </>
    )
}

export default MascotasEdit*/


import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Layout from "../layout/Layout";
import { createMascotaAsync, getMascotaAsync, updateMascotaAsync } from "./mascotasSlice";
import styles from "./MascotasEdit.module.css";
import loaderGif from '/images/loader.gif';

function MascotasEdit() {
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigateTo = useNavigate();
    const mascota = useSelector((state: any) => state.mascotas.mascotaSelected);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            dispatch(getMascotaAsync(id)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id, dispatch]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = doPayload(event);
        if (isEdit) {
            dispatch(updateMascotaAsync(payload));
        } else {
            dispatch(createMascotaAsync(payload));
        }
        navigateTo('/mascotas');
    };

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

