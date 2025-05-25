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
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);
    const status = useSelector((state: any) => state.mascotas.status);
    const currentPage = useSelector((state: any) => state.mascotas.currentPage);
    const totalPages = useSelector((state: any) => state.mascotas.totalPages);

    useEffect(() => {
        dispatch(resetMascota());
        dispatch(getMascotasAsync({ page, perPage }));
    }, [dispatch, page]);

    const handleClose = () => {
        setDeleteId("");
        setShow(false);
    };

    const handleShow = (id: string) => {
        setDeleteId(id);
        setShow(true);
    };

    const handleDelete = () => {
        dispatch(deleteMascotaAsync(deleteId))
            .then(() => {
                setShow(false);
                // Después de borrar, recarga la página actual.
                // Nota: si borraste la última mascota de la página, el slice bajará la página automáticamente
                dispatch(getMascotasAsync({ page, perPage }));
            });
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

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <Layout>
            <Container className={styles.container}>
                <div className={styles.tituloYBoton}>
                    <h1>Listado de Mascotas</h1>
                    <Link className={`${styles.btn} ${styles.btnVer} ${styles.btnCrear}`} to="/mascotas/create">
                        Crear Mascota
                    </Link>
                </div>


                {status === "loading" ? (
                    <div className={styles.loaderContainer}>
                        <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                    </div>
                ) : (
                    <div className={styles.mascotasContainer}>
                        {Array.isArray(mascotas) && mascotas.length > 0 ? (
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
                        ) : (
                            <p>No hay mascotas para mostrar.</p>
                        )}
                    </div>
                )}

                {/* Paginación */}
                <div className={styles.pagination}>
                    <button
                        className={styles.btn}
                        onClick={handlePrevPage}
                        disabled={page <= 1}
                    >
                        ← Anterior
                    </button>
                    <span className={styles.paginationInfo}>Página {currentPage} de {totalPages}</span>
                    <button
                        className={styles.btn}
                        onClick={handleNextPage}
                        disabled={page >= totalPages}
                    >
                        Siguiente →
                    </button>
                </div>


                {/* Modal Confirmación Borrado */}
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
