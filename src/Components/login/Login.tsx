import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { loginAsync } from './loginSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Login() {
    const token = useSelector((state: any) => state.login.token)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const navigateTo = useNavigate()
    useEffect(() => {
        if (token) navigateTo('/')
    }, [navigateTo, token])


    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const { target } = event;

        const payload = {
            email: target.email.value,
            password: target.password.value
        }
        dispatch(loginAsync(payload))
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
