import React, {useState, useEffect} from 'react';
import {TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@mui/material';
import {Dialog, DialogContent, DialogActions } from '@mui/material';
import Navbar from "./Navbar";
import axios from "axios";
import CarForm from "./CarForm";

const CarManagement = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState({
        rejestracja: '',
        nazwa_modelu: '',
        parametry_techniczne: '',
        rocznik: '',
        uwagi: ''
    });
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const openAddDialog = () => setAddDialogOpen(true);
    const closeAddDialog = () => setAddDialogOpen(false);
    const openEditDialog = (car) => {
        setSelectedCar(car);
        setEditDialogOpen(true);
    };
    const closeEditDialog = () => setEditDialogOpen(false);

    useEffect(() => {
        fetchCars();
    }, []);
    const fetchCars = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/get_all_pojazdy', config);
            setCars(response.data.pojazdy);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu danych o pojazdach:', error);
        }
    };
    const handleAddCar = async (car) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await axios.post('http://127.0.0.1:5000/api/add_pojazd', car, config);
            fetchCars();
            closeAddDialog();
        } catch (error) {
            console.error('Wystąpił błąd przy dodawaniu pojazdu:', error);
        }
    };
    const handleEditCar = async (car) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            await axios.put(`http://127.0.0.1:5000/api/update_car/${car.id}`, car, config);
            fetchCars();
            closeEditDialog();
        } catch (error) {
            console.error('Wystąpił błąd przy aktualizacji pojazdu:', error);
        }
    };
    const handleInputChange = (e) => {
        setSelectedCar({...selectedCar, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const url = selectedCar.id
            ? `http://127.0.0.1:5000/api/update_car/${selectedCar.id}`
            : `http://127.0.0.1:5000/api/add_pojazd`;

        try {
             selectedCar.id
                ? await axios.put(url, selectedCar, config)
                : await axios.post(url, selectedCar, config);

            fetchCars();
        } catch (error) {
            console.error('Wystąpił błąd przy aktualizacji/dodawaniu pojazdu:', error);
        }
    };

    const handleEdit = (car) => {
        setSelectedCar(car);
    };
    const handleDelete = async (carId) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        try {
            await axios.delete(`http://127.0.0.1:5000/api/delete_pojazd/${carId}`, config);
            fetchCars(); // Odśwież listę pojazdów po usunięciu
        } catch (error) {
            console.error('Wystąpił błąd przy usuwaniu pojazdu:', error);
        }
    };

    return (
        <>
            <Navbar/>

            <Button onClick={openAddDialog}>Dodaj Samochód</Button>
            <Dialog open={isAddDialogOpen} onClose={closeAddDialog}>
                <DialogContent>
                    <CarForm onSubmit={handleAddCar} initialCar={{}} />
                </DialogContent>
            </Dialog>
            <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
                <DialogContent>
                    <CarForm onSubmit={handleEditCar} initialCar={selectedCar} />
                </DialogContent>
            </Dialog>
            <Paper style={{padding: 16}}>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rejestracja</TableCell>
                            <TableCell>Nazwa Modelu</TableCell>
                            <TableCell>Parametry Techniczne</TableCell>
                            <TableCell>Rocznik</TableCell>
                            <TableCell>Uwagi</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>{car.rejestracja}</TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car['parametry techniczne']}</TableCell>
                                <TableCell>{car.rocznik}</TableCell>
                                <TableCell>{car.uwagi}</TableCell>
                                <TableCell>
                                    <Button onClick={() => openEditDialog(car)}>Edytuj</Button>
                                    <Button onClick={() => handleDelete(car.id)}>Usuń</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default CarManagement;
