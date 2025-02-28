import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
import styles from "./UsuariosSee.module.css";
import loaderGif from '/images/loader.gif';

function UsuariosSee() {
    // Obtiene el id del usuario de los parámetros de la URL
    const { id } = useParams();
    // Obtiene la lista de usuarios del estado de Redux
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);
    // Estado local para almacenar el usuario seleccionado
    const [usuario, setUsuario] = useState<any>();

    // Efecto para encontrar y establecer el usuario seleccionad
    useEffect(() => {
        if (id) {
            const usuarioSelected = usuarios.find((u: any) => u.id == id);
            setUsuario(usuarioSelected);
        }
    }, [id, usuarios]);

    return (
        <Layout>
            <div className={styles.detalleUsuarioContainer}>
                <h1>Detalle de Usuario</h1>
                {!usuario ? (
                    <div className={styles.loaderContainer}>
                        <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                    </div>
                ) : (
                    <div className={styles.detalleUsuarioCard}>
                        <img
                            src="/images/persona.jpg"
                            alt="Usuario"
                            className={styles.detalleUsuarioImg}
                        />
                        <div className={styles.detalleUsuarioInfo}>
                            <h2>{usuario.name}</h2>
                            <p><strong>Email:</strong> {usuario.email}</p>
                            <p><strong>Dirección:</strong> {usuario.direccion}</p>
                            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                        </div>
                    </div>
                )}
                <Link to="/usuarios" className={styles.btnVolver}>Volver al Listado</Link>
            </div>
        </Layout>
    );
}

export default UsuariosSee;
