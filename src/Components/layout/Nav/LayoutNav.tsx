import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Nav, Navbar } from 'react-bootstrap';

function LayoutNav() {

    const token = useSelector((state: any) => state.login.token);
    const navigateTo = useNavigate()

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Protectora Mascotas</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Mascotas</Nav.Link>
                        <Nav.Link href="#features">Citas</Nav.Link>
                        <Nav.Link href="#pricing">Usuarios</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default LayoutNav
