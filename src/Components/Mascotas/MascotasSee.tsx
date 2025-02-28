import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
import styles from "./MascotasSee.module.css";
import loaderGif from '/images/loader.gif';


function MascotasSee() {
    // Obtiene el id de la mascota de los parámetros de la URL
    const { id } = useParams();
    // Obtiene la lista de mascotas del estado de Redux
    const mascotas = useSelector((state: any) => state.mascotas.mascotas);
    // Estado local para almacenar la mascota seleccionada
    const [mascota, setMascota] = useState<any>();

    // Efecto para encontrar y establecer la mascota seleccionada
    useEffect(() => {
        if (id) {
            const mascotaSelected = mascotas.find((m: any) => m.id == id);
            setMascota(mascotaSelected);
        }
    }, [id, mascotas]);

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

