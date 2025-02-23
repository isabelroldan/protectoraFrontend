import { Button, ButtonGroup, Container, Modal, Table } from "react-bootstrap"
import Layout from "../layout/Layout"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { getSolicitudesAsync, resetSolicitud } from "./solicitudesSlice";


function Solicitudes() {
    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);
    useEffect(() => {
        dispatch(resetSolicitud());
        dispatch(getSolicitudesAsync())
        console.log(solicitudes);
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
        // dispatch(deleteMascotaAsync(deleteId))
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
                {solicitudes === ""
                    ? <p>Cargando...</p>
                    : <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Estado</th>
                                <th>Fecha Solicitud</th>
                                <th>Nombre Mascota</th>
                                <th>Nombre Usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((solicitud: any) => {
                                return (<tr>
                                    <td>{solicitud.id}</td>
                                    <td>{solicitud.estado}</td>
                                    <td>{solicitud.fecha_solicitud}</td>
                                    <td>{solicitud.mascota?.nombre}</td>
                                    <td>{solicitud.usuario?.name}</td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            <Link className="btn btn-secondary" role="button" to={`/solicitudes/see/${solicitud.id}`}> Ver </Link>
                                            <Link className="btn btn-secondary" role="button" to={`/solicitudes/edit/${solicitud.id}`}> Editar </Link>
                                            <Button onClick={() => handleShow(solicitud.id)} variant="secondary">Eliminar</Button>
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

export default Solicitudes
