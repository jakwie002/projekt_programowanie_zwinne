import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import Navbar from "./Navbar";

function MyIssues() {
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
            const response = await axios.get('http://127.0.0.1:5000/api/driver/usterki', { headers: { Authorization: `Bearer ${token}` } });
            setUsterki(response.data.usterki);
        } catch (error) {
            console.error('Błąd podczas pobierania danych o usterekach:', error);
        }
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
                            <TableCell> Zespół </TableCell>
                            <TableCell>Komentarz serwisatna</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usterki.map((usterka) => (
                            <TableRow key={usterka.id}>
                                <TableCell>{usterka.id}</TableCell>
                                <TableCell>{usterka.opis}</TableCell>
                                <TableCell>{usterka.priorytet ? 'Tak' : 'Nie'}</TableCell>
                                <TableCell>{usterka.status}</TableCell>
                                <TableCell>{usterka.zespół.length > 0 ? usterka.zespół[0].nazwa : 'Brak zespołu'}</TableCell>
                                <TableCell>{usterka.komentarz_serwisanta}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default MyIssues;
