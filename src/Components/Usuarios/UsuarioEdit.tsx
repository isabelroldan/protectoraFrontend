import { useNavigate, useParams } from "react-router-dom";
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

export default UsuariosEdit
