import { Container } from "react-bootstrap"
import Layout from "../layout/Layout"


function Principal() {

    return (
        <Layout>
            <Container className="h-100">
                <p>Esta es la página principal (Aquí podríamos mostrar Listado de animales ya adoptados, citas pendientes, etc.)</p>
            </Container>
        </Layout>
    )
}

export default Principal
