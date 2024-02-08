import React, { useState, useEffect } from 'react';
import {Paper, Button, FormControl, InputLabel, Select, MenuItem, Grid, Container, Typography} from '@mui/material';
import axios from 'axios';
import Navbar from "./Navbar";

const AssignUsterkaForm = () => {
    const [usterkaId, setUsterkaId] = useState('');
    const [zespolId, setZespolId] = useState('');
    const [usterki, setUsterki] = useState([]);
    const [zespoły, setZespoły] = useState([]);

    useEffect(() => {
        getUsterki();
        getZespoły();
    }, []);

    const getUsterki = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get('http://127.0.0.1:5000/api/get_all_usterki', config);
            setUsterki(response.data.usterki);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu usterek:', error);
        }
    };

    const getZespoły = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get('http://127.0.0.1:5000/api/get_zespoly', config);
            const teamsData = response.data.zespoly;
            const transformedTeams = Object.keys(teamsData).map(key => {
                return {
                    nazwa: key,
                    id: teamsData[key].id_zespolu
                };
            });
            setZespoły(transformedTeams);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu zespołów:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { usterka_id: usterkaId, zespol_id: zespolId };

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('http://127.0.0.1:5000/api/assign_usterka_to_zespol', data, config);

            console.log(response.data); // Tylko do celów demonstracyjnych
        } catch (error) {
            console.error('Wystąpił błąd przy przesyłaniu danych:', error);
        }
    };


    return (
        <>
            <Navbar/>
            <Container component="main" maxWidth="md" style={{ marginTop: '20px' }}>
                <Paper style={{ padding: '20px' }}>
                    <Typography component="h1" variant="h5" align="center">
                        Przypisz Usterkę do Zespołu
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>ID Usterki</InputLabel>
                                    <Select
                                        value={usterkaId}
                                        onChange={(e) => setUsterkaId(e.target.value)}
                                        label="ID Usterki"
                                    >
                                        {usterki.map(usterka => (
                                            <MenuItem key={usterka.id} value={usterka.id}>
                                                {`Usterka ${usterka.id}: ${usterka.opis}`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>ID Zespołu</InputLabel>
                                    <Select
                                        value={zespolId}
                                        onChange={(e) => setZespolId(e.target.value)}
                                        label="ID Zespołu"
                                    >
                                        {zespoły.map(zespol => (
                                            <MenuItem key={zespol.id} value={zespol.id}>
                                                {zespol.nazwa}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Przypisz Usterkę do Zespołu
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default AssignUsterkaForm;