import { useNavigate, useParams } from "react-router-dom";
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

export default MascotasEdit
