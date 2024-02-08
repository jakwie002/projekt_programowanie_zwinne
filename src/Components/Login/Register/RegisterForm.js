import React, { useState } from 'react';
import {TextField, Button, Container, Typography, Grid} from '@mui/material';
import AuthService from "../../../Service/AuthService";
import {Link} from "react-router-dom";

function RegisterForm() {
    const [user, setUser] = useState({
        imie: '',
        nazwisko: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.register(user);
            if (response) {
                alert('Rejestracja przebiegła pomyślnie');
                // Można tutaj dodać przekierowanie lub inne akcje
            }
        } catch (error) {
            console.error(error);
            alert('Błąd rejestracji');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Rejestracja
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Imię"
                    name="imie"
                    autoFocus
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Nazwisko"
                    name="nazwisko"
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
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
                    Zarejestruj się
                </Button>
            </form>
            <Grid container>
                <Grid item>
                    <Link to="/login" variant="body2">
                        {'Masz już konto? Zaloguj się'}
                    </Link>
                </Grid>
            </Grid>

        </Container>
    );
}

export default RegisterForm;
