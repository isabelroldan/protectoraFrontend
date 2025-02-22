import { Col, Container, Image, Nav, NavLink, Row, Stack } from "react-bootstrap"

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
