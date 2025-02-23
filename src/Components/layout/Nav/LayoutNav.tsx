import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Nav, Navbar } from 'react-bootstrap';

function LayoutNav() {

    const token = useSelector((state: any) => state.login.token);
    const navigateTo = useNavigate()

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to={"/"} >Protectora Mascotas</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/mascotas"}>Mascotas</Nav.Link>
                        <Nav.Link as={Link} to={"/solicitudes"}>Solicitudes</Nav.Link>
                        <Nav.Link as={Link} to={"/usuarios"}>Usuarios</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default LayoutNav
