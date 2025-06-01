import { useEffect, useState } from "react";
import { Container, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import {
    deleteSolicitudAsync,
    getSolicitudesAsync,
    resetSolicitud
} from "./solicitudesSlice";
import styles from "./Solicitudes.module.css";
import loaderGif from "/images/loader.gif";
import toast from "react-hot-toast";

function Solicitudes() {
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const solicitudes = useSelector((state: any) => state.solicitudes.solicitudes);
    const status = useSelector((state: any) => state.solicitudes.status);
    const currentPage = useSelector((state: any) => state.solicitudes.currentPage);
    const totalPages = useSelector((state: any) => state.solicitudes.totalPages);

    useEffect(() => {
        dispatch(resetSolicitud());
        dispatch(getSolicitudesAsync({ page, perPage, search }));
    }, [dispatch, page, search]);

    const handleClose = () => {
        setDeleteId("");
        setShow(false);
    };

    const handleShow = (id: string) => {
        setDeleteId(id);
        setShow(true);
    };

    const handleDelete = () => {
        dispatch(deleteSolicitudAsync(deleteId)).then(() => {
            setShow(false);
            dispatch(getSolicitudesAsync({ page, perPage, search }));
            toast.success("Solicitud eliminada correctamente 📄");

        });
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const executeSearch = () => {
        setPage(1);
        setSearch(searchInput.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            executeSearch();
        }
    };

    return (
        <Layout>
            <Container className={styles.container}>
                <div className={styles.tituloYBoton}>
                    <h1>Listado de Solicitudes</h1>
                    <Link className={`${styles.btn} ${styles.btnVer} ${styles.btnCrear}`} to="/solicitudes/create">
                        Crear Solicitud
                    </Link>
                </div>

                <InputGroup className="mb-4" style={{ maxWidth: 300, marginLeft: "auto" }}>
                    <FormControl
                        placeholder="Buscar por mascota o usuario..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button variant="outline-secondary" onClick={executeSearch} aria-label="Buscar">
                        🔍
                    </Button>
                </InputGroup>

                {status === "loading" ? (
                    <div className={styles.loaderContainer}>
                        <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                    </div>
                ) : (
                    <>
                        <div className={styles.solicitudesContainer}>
                            {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
                                solicitudes.map((solicitud: any, index: number) => (
                                    <div key={solicitud.id} className={styles.solicitudCard}>
                                        <div className={styles.solicitudInfo}>
                                            <h2>Solicitud {index + 1}</h2>
                                            <p><strong>Mascota:</strong> {solicitud.mascota?.nombre}</p>
                                            <p><strong>Usuario:</strong> {solicitud.usuario?.name}</p>
                                            <p>
                                                <strong>Fecha:</strong>{' '}
                                                {solicitud.fecha_solicitud
                                                    ? new Date(solicitud.fecha_solicitud).toLocaleDateString('es-ES')
                                                    : 'No especificada'}
                                            </p>
                                            <p><strong>Estado:</strong> <span className={`${styles.estado} ${styles[solicitud.estado.toLowerCase()]}`}>{solicitud.estado}</span></p>
                                            <div className={styles.acciones}>
                                                <Link className={`${styles.btn} ${styles.btnVer}`} to={`/solicitudes/see/${solicitud.id}`}>Ver Detalle</Link>
                                                <Link className={`${styles.btn} ${styles.btnEditar}`} to={`/solicitudes/edit/${solicitud.id}`}>Editar</Link>
                                                <button className={`${styles.btn} ${styles.btnBorrar}`} onClick={() => handleShow(solicitud.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.mensajeVacio}>No se encontraron solicitudes.</p>
                            )}
                        </div>

                        <div className={styles.pagination} style={{ justifyContent: "flex-end" }}>
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
                    </>
                )}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Solicitud</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Estás seguro de que deseas eliminar esta solicitud?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
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

export default Solicitudes;
