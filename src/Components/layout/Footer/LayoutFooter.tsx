/*import { Col, Container, Image, Nav, NavLink, Row, Stack } from "react-bootstrap"

function LayoutFooter() {

    return (
        <>
            <footer>
                <Container fluid>
                    <Row className="bg-primary text-white p-4">
                        <Col className="mx-5">
                            <Stack>
                                <Image
                                    src="https://www.shutterstock.com/image-vector/abstract-initial-letter-d-logo-600nw-2055050639.jpg"
                                    alt="company logo"
                                    rounded
                                    width={150}
                                    height={150}
                                />
                                <h2>Company Name</h2>
                                <p>Company tagline here</p>
                            </Stack>
                        </Col>
                        <Col>
                            <Nav className="flex-column fs-5">
                                Useful Links
                                <NavLink href="#" className="text-white">Home</NavLink>
                                <NavLink href="#" className="text-white">About</NavLink>
                                <NavLink href="#" className="text-white">Products</NavLink>
                            </Nav>
                        </Col>
                        <Col>
                            <h4>Contact us!</h4>
                            <p>email@fakeemail.com</p>
                            <p>Phone: 666666666</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default LayoutFooter
*/

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './LayoutFooter.module.css';

function LayoutFooter() {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row>
                    <Col md={4}>
                        <h3 className={styles.footerTitle}>Protectora de Animales</h3>
                        <p>Dedicados al cuidado y adopción de mascotas desde 2016.</p>
                    </Col>
                    <Col md={4}>
                        <h4 className={styles.footerSubtitle}>Enlaces Útiles</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/mascotas">Mascotas en Adopción</Link></li>
                            <li><Link to="/solicitudes">Solicitar Adopción</Link></li>
                            <li><Link to="/">Sobre Nosotros</Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h4 className={styles.footerSubtitle}>Contáctanos</h4>
                        <p>Email: adopciones@protectora.com</p>
                        <p>Teléfono: 6582575961</p>
                        <p>Dirección: Calle de la Huella 1, Córdoba</p>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles.footerBottom}>
                        <p>&copy; 2023 Protectora de Animales. Todos los derechos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default LayoutFooter;
