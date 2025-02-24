/*import { Button, ButtonGroup, Container, Modal, Table } from "react-bootstrap"
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

export default Mascotas*/

import React, { useEffect, useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { deleteMascotaAsync, getMascotasAsync, resetMascota } from "./mascotasSlice";
import styles from "./Mascotas.module.css";
import loaderGif from '/images/loader.gif';

function Mascotas() {
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);

    useEffect(() => {
        dispatch(resetMascota());
        dispatch(getMascotasAsync());
    }, [dispatch]);

    const handleClose = () => {
        setDeleteId("");
        setShow(false);
    };

    const handleShow = (id: string) => {
        setDeleteId(id);
        setShow(true);
    };

    const handleDelete = () => {
        dispatch(deleteMascotaAsync(deleteId));
        setShow(false);
    };

    const getImageSrc = (especie: string) => {
        const especieLower = especie.toLowerCase();
        if (especieLower === 'perro' || especieLower === 'perra') {
            return '/images/perro.jpg';
        } else if (especieLower === 'gato' || especieLower === 'gata') {
            return '/images/gato.jpg';
        }
        return '/images/default.jpg';
    };

    return (
        <Layout>
            <Container className={styles.container}>
                <h1>Listado de Mascotas</h1>
                <Link className={`${styles.btn} ${styles.btnVer} ${styles.btnCrear}`} to="/mascotas/create">
                    Crear Mascota
                </Link>


                <div className={styles.mascotasContainer}>
                    {mascotas === "" ? (
                        <div className={styles.loaderContainer}>
                            <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                        </div>
                    ) : (
                        mascotas.map((mascota: any) => (
                            <div key={mascota.id} className={styles.mascotaCard}>
                                <div className={styles.mascotaImgContainer}>
                                    <img
                                        src={getImageSrc(mascota.especie)}
                                        alt={mascota.especie}
                                        className={styles.mascotaImg}
                                    />
                                </div>
                                <div className={styles.mascotaInfo}>
                                    <h2>{mascota.nombre}</h2>
                                    <p><strong>Especie:</strong> {mascota.especie}</p>
                                    <p><strong>Raza:</strong> {mascota.raza}</p>
                                    <p><strong>Edad:</strong> {mascota.edad} años</p>
                                    <p><strong>Descripción:</strong> {mascota.descripcion}</p>
                                    <p><strong>Estado:</strong> {mascota.estado}</p>
                                    <div className={styles.acciones}>
                                        <Link className={`${styles.btn} ${styles.btnVer}`} to={`/mascotas/see/${mascota.id}`}>Ver Detalle</Link>
                                        <Link className={`${styles.btn} ${styles.btnEditar}`} to={`/mascotas/edit/${mascota.id}`}>Editar</Link>
                                        <button className={`${styles.btn} ${styles.btnBorrar}`} onClick={() => handleShow(mascota.id)}>Borrar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>ATENCIÓN!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirme que desea eliminar la mascota</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Layout>
    );
}

export default Mascotas;

