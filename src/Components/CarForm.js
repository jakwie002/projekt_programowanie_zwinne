import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const CarForm = ({ onSubmit, initialCar }) => {
    const [car, setCar] = useState(initialCar);

    useEffect(() => {
        setCar(initialCar);
    }, [initialCar]);

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(car); }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth name="rejestracja" label="Rejestracja" value={car.rejestracja || ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name="nazwa_modelu" label="Nazwa modelu" value={car.nazwa_modelu || ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name="parametry_techniczne" label="Parametry techniczne" value={car.parametry_techniczne || ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name="rocznik" label="Rocznik" value={car.rocznik || ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name="uwagi" label="Uwagi" value={car.uwagi || ''} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" fullWidth>Zapisz</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CarForm;
