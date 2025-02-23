import { useParams } from "react-router-dom";
import Layout from "../layout/Layout"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function MascotasSee() {
    const { id } = useParams();
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);
    const [mascota, setMascota] = useState()
    useEffect(() => {
        if (id) {
            if (mascota) {
                setMascota(undefined)
            }
            const mascotaSelected = mascotas.find((mascota: any) => mascota.id == id);

            setMascota(mascotaSelected)
            console.log(mascota);
        }
    }, [])
    return (
        <>
            <Layout>
                {(!mascota)
                    ? <p>Cargando...</p>
                    : <div>
                        <p>Nombre: {mascota.nombre}</p>
                        <p>Especie: {mascota.especie}</p>
                        <p>Raza: {mascota.raza}</p>
                        <p>Edad: {mascota.edad}</p>
                        <p>Descripción: {mascota.descripcion}</p>
                        <p>Estado: {mascota.estado}</p>
                    </div>
                }

            </Layout>
        </>
    )
}

export default MascotasSee
