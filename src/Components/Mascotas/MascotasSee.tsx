/*import { useParams } from "react-router-dom";
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

export default MascotasSee*/

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
import styles from "./MascotasSee.module.css";
import loaderGif from '/images/loader.gif';


function MascotasSee() {
    const { id } = useParams();
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);
    const [mascota, setMascota] = useState<any>();

    useEffect(() => {
        if (id) {
            const mascotaSelected = mascotas.find((m: any) => m.id == id);
            setMascota(mascotaSelected);
        }
    }, [id, mascotas]);

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
            <div className={styles.detalleMascotaContainer}>
                <h1>Detalle de Mascota</h1>
                {!mascota ? (
                    <div className={styles.loaderContainer}>
                        <img src={loaderGif} alt="Cargando" className={styles.loaderGif} />
                    </div>
                ) : (
                    <div className={styles.detalleMascotaCard}>
                        <img
                            src={getImageSrc(mascota.especie)}
                            alt={mascota.especie}
                            className={styles.detalleMascotaImg}
                        />
                        <div className={styles.detalleMascotaInfo}>
                            <h2>{mascota.nombre}</h2>
                            <p><strong>Especie:</strong> {mascota.especie}</p>
                            <p><strong>Raza:</strong> {mascota.raza}</p>
                            <p><strong>Edad:</strong> {mascota.edad} años</p>
                            <p><strong>Descripción:</strong> {mascota.descripcion}</p>
                            <p><strong>Estado:</strong> {mascota.estado}</p>
                        </div>
                    </div>
                )}
                <Link to="/mascotas" className={styles.btnVolver}>Volver al Listado</Link>
            </div>
        </Layout>
    );
}

export default MascotasSee;

