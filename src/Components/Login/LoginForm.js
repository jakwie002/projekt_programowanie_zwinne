import React, { useState } from 'react';
import {TextField, Button, Container, Typography, Grid} from '@mui/material';
import AuthService from "../../Service/AuthService";
import {Link, useNavigate} from 'react-router-dom'

function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    let navigate = useNavigate()

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login(loginData.email, loginData.password);
            if (response && response.token) {
                alert('Logowanie pomyślne');
                navigate('/dashboard') // Handle successful login
            }
        } catch (error) {
            console.error(error);
            alert('Błąd logowania');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Logowanie
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    autoFocus
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Hasło"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Zaloguj się
                </Button>
            </form>
            <Grid container>
                <Grid item>
                    <Link to='/register' variant='body2'>
                        {'Nie masz konta? Zarejestruj się'}
                    </Link>
                </Grid>
            </Grid>

        </Container>
    );
}

export default LoginForm;
