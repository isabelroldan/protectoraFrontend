/*import { Container } from "react-bootstrap"
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

export default Principal*/


import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Layout from '../layout/Layout';
import styles from './Principal.module.css';

function Principal() {
    return (
        <Layout>
            <div className={styles.hero}>
                <h1>Bienvenidos a Nuestra Protectora de Animales</h1>
                <p>Dando amor y hogar a quienes más lo necesitan</p>
            </div>

            <Container>
                <section className={styles.section}>
                    <h2>Nuestros Últimos Adoptados</h2>
                    <Row>
                        {['Luna', 'Max', 'Bella'].map((name) => (
                            <Col md={4} key={name}>
                                <Card className={styles.adoptedCard}>
                                    <Card.Img variant="top" src={`/images/${name.toLowerCase()}.jpg`} />
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                        <Card.Text>
                                            {name} encontró su hogar para siempre. ¡Gracias por adoptar!
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                <section className={styles.section}>
                    <h2>Próximos Eventos</h2>
                    <Row>
                        <Col md={6}>
                            <Card className={styles.eventCard}>
                                <Card.Body>
                                    <Card.Title>Jornada de Adopción</Card.Title>
                                    <Card.Text>
                                        Este sábado, ven a conocer a nuestros adorables animales en busca de hogar.
                                    </Card.Text>
                                    <Button variant="primary">Más Información</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className={styles.eventCard}>
                                <Card.Body>
                                    <Card.Title>Campaña de Vacunación</Card.Title>
                                    <Card.Text>
                                        Vacunación gratuita para perros y gatos. ¡No te lo pierdas!
                                    </Card.Text>
                                    <Button variant="primary">Más Información</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </section>

                <section className={styles.section}>
                    <h2>¿Por qué adoptar?</h2>
                    <Row>
                        <Col md={4}>
                            <div className={styles.reasonCard}>
                                <i className="fas fa-heart"></i>
                                <h3>Salvas una Vida</h3>
                                <p>Cada adopción significa una nueva oportunidad para un animal necesitado.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className={styles.reasonCard}>
                                <i className="fas fa-home"></i>
                                <h3>Ganas un Amigo</h3>
                                <p>Los animales adoptados suelen ser increíblemente leales y agradecidos.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className={styles.reasonCard}>
                                <i className="fas fa-paw"></i>
                                <h3>Combates el Abandono</h3>
                                <p>Adoptar ayuda a reducir el número de animales sin hogar en las calles.</p>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
        </Layout>
    );
}

export default Principal;

