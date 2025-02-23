import { Button, ButtonGroup, Container, Modal, Table } from "react-bootstrap"
import Layout from "../layout/Layout"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { deleteMascotaAsync, getMascotasAsync, resetMascota } from "./mascotasSlice";
import { Link } from "react-router-dom";


function Mascotas() {
    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);
    useEffect(() => {
        dispatch(resetMascota());
        dispatch(getMascotasAsync())
        console.log(mascotas);
    }, [dispatch])

    const handleClose = () => {
        setDeleteId("")
        setShow(false)
    };
    const handleShow = (id: string) => {
        setDeleteId(id)
        setShow(true)
    };
    const handleDelete = () => {
        console.log(`has pulsado el botón eliminar para el id: ${deleteId}`)
        dispatch(deleteMascotaAsync(deleteId))
        setShow(false)
    }

    return (
        <Layout>
            <Container>
                <h2>Listado de mascotas</h2>
                <Link className="btn btn-secondary" role="button" to={`/mascotas/create`}> Crear </Link>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>ATENCION!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirme que desea eliminar la mascota</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete()}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
                {mascotas === ""
                    ? <p>Cargando...</p>
                    : <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Especie</th>
                                <th>Raza</th>
                                <th>Edad</th>
                                <th>Descripcion</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mascotas.map((mascota: any) => {
                                return (<tr>
                                    <td>{mascota.id}</td>
                                    <td>{mascota.nombre}</td>
                                    <td>{mascota.especie}</td>
                                    <td>{mascota.raza}</td>
                                    <td>{mascota.edad}</td>
                                    <td>{mascota.descripcion}</td>
                                    <td>{mascota.estado}</td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            <Link className="btn btn-secondary" role="button" to={`/mascotas/see/${mascota.id}`}> Ver </Link>
                                            <Link className="btn btn-secondary" role="button" to={`/mascotas/edit/${mascota.id}`}> Editar </Link>
                                            <Button onClick={() => handleShow(mascota.id)} variant="secondary">Eliminar</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                }
            </Container>
        </Layout>
    )
}

export default Mascotas
