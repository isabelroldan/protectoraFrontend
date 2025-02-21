import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
function Login() {


    const handleSubmit = (event: any) => {
        event.preventDefault()
        const { target } = event;

        const payload = {
            email: target.email.value,
            password: target.password.value
        }
        console.log(target, payload);

    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Introduce el email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type='submit'>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default Login
