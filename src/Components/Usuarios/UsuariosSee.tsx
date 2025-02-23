import { useParams } from "react-router-dom";
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
