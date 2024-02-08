import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Ikona edycji

import axios from 'axios';
import UpdateUsterkaDialog from './UpdateUsterka';
import Navbar from "./Navbar";

function SerwisantIssues() {
    const [usterki, setUsterki] = useState([]);

    useEffect(() => {
        fetchUsterki();
    }, []);

    const fetchUsterki = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/my-usterki', { headers: { Authorization: `Bearer ${token}` } });
            setUsterki(response.data.usterki);
        } catch (error) {
            console.error('Błąd podczas pobierania danych o usterekach:', error);
        }
    };

    const [open, setOpen] = useState(false);
    const [selectedUsterka, setSelectedUsterka] = useState(null);
    const [komentarz, setKomentarz] = useState('');
    const [nowyStatusId, setNowyStatusId] = useState(1);

    const statusMap = {
        1: 'Oczekuje',
        2: 'W trakcie',
        3: 'Rozwiązane',
        4: 'Zamknięte'
    };

    const handleClickOpen = (usterka) => {
        setSelectedUsterka(usterka);
        setKomentarz('');
        setNowyStatusId(usterka.status_id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.put(
            `http://127.0.0.1:5000/api/usterki/${selectedUsterka.id}`,
            {
                komentarz_serwisanta: komentarz,
                nowy_status_id: nowyStatusId
            }, config
           
        )
        
        .then(response => {
            console.log('Zaktualizowano usterkę:', response);
            // Możesz tu dodać logikę odświeżenia danych w tabeli, jeśli jest to potrzebne
            handleClose();
        })
        .catch(error => {
            console.error('Wystąpił błąd podczas aktualizacji usterki:', error);
        });
    };
    return (
        <>
            <Navbar/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Usterki</TableCell>
                            <TableCell>Opis</TableCell>
                            <TableCell>Priorytet</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Numer rejestracyjjny</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell> Komentarz serwisanta</TableCell>
                            <TableCell>Akcje</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usterki.map((usterka) => (
                            <TableRow key={usterka.id}>
                                <TableCell>{usterka.id}</TableCell>
                                <TableCell>{usterka.opis}</TableCell>
                                <TableCell>{usterka.priorytet ? 'Tak' : 'Nie'}</TableCell>
                                <TableCell>{statusMap[usterka.status_id]}</TableCell>
                                <TableCell>{usterka.samochod.model}</TableCell>
                                <TableCell>{usterka.samochod.rejestracja}</TableCell>
                                
                                <TableCell>{usterka.komentarz_serwisanta}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleClickOpen(usterka)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedUsterka && (
                <UpdateUsterkaDialog
                    open={open}
                    handleClose={handleClose}
                    komentarz={komentarz}
                    setKomentarz={setKomentarz}
                    nowyStatusId={nowyStatusId}
                    setNowyStatusId={setNowyStatusId}
                    handleSave={handleSave}
                />
            )}
        </>
    );
};

export default SerwisantIssues;
