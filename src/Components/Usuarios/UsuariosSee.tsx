/*import { useParams } from "react-router-dom";
import Layout from "../layout/Layout"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function UsuariosSee() {
    const { id } = useParams();
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);
    const [usuario, setUsuario] = useState()
    useEffect(() => {
        if (id) {
            if (usuario) {
                setUsuario(undefined)
            }
            const usuarioSelected = usuarios.find((usuario: any) => usuario.id == id);

            setUsuario(usuarioSelected)
            console.log(usuario);
        }
    }, [])
    return (
        <>
            <Layout>
                {(!usuario)
                    ? <p>Cargando...</p>
                    : <div>
                        <p>Nombre: {usuario.name}</p>
                        <p>Email: {usuario.email}</p>
                        <p>Dirección: {usuario.direccion}</p>
                        <p>Teléfono: {usuario.telefono}</p>
                    </div>
                }

            </Layout>
        </>
    )
}

export default UsuariosSee
*/

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
import styles from "./UsuariosSee.module.css";
import loaderGif from '/images/loader.gif';

function UsuariosSee() {
    const { id } = useParams();
    const usuarios = useSelector((state: any) => state.usuarios.usuarios);
    const [usuario, setUsuario] = useState<any>();

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
