import { useEffect, useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { deleteMascotaAsync, getMascotasAsync, resetMascota } from "./mascotasSlice";
import styles from "./Mascotas.module.css";
import loaderGif from '/images/loader.gif';

function Mascotas() {
    // Estados locales para manejar el modal de confirmación de eliminación
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    // Obtiene la lista de mascotas del estado de Redux
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);

    // Efecto para cargar las mascotas al montar el componente
    useEffect(() => {
        dispatch(resetMascota());
        dispatch(getMascotasAsync());
    }, [dispatch]);

    // Funciones para manejar el modal de confirmación de eliminación
    const handleClose = () => {
        setDeleteId("");
        setShow(false);
    };

    const handleShow = (id: string) => {
        setDeleteId(id);
        setShow(true);
    };

    // Función para eliminar una mascota
    const handleDelete = () => {
        dispatch(deleteMascotaAsync(deleteId));
        setShow(false);
    };

    // Función para determinar la imagen de la mascota basada en su especie
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

