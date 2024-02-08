import React, {useState, useEffect} from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    TablePagination,
    TableFooter, Typography, CardContent, Card, Grid
} from '@mui/material';
import axios from "axios";
import {UpdateUserForm} from "./UpdateUserForm";
import Navbar from "../Navbar";

const UsersView = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(true);
    const handleClose = () => {
        setIsFormOpen(false);
    };
    const getUsers = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/users?page=${page + 1}`, config);
            setUsers(response.data.users);
            setPage(response.data.current_page - 1);
            setTotalPages(response.data.pages);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu danych użytkowników:', error);
        }
    };
    useEffect(() => {


        getUsers();
    }, []);
    const handleUpdate = async (userId, updatedUserData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };

            await axios.put(`http://127.0.0.1:5000/api/users/${userId}`, updatedUserData, config);

            console.log('Użytkownik zaktualizowany.');
            // Możesz tutaj również zaktualizować stan użytkownika w Twojej aplikacji, jeśli to konieczne
        } catch (error) {
            console.error('Wystąpił błąd podczas aktualizacji użytkownika:', error);
        }
    };
    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            await axios.delete(`http://127.0.0.1:5000/api/delete_users/${userId}`, config);

        } catch (error) {
            // Obsługa błędów
            console.error('Wystąpił błąd przy usuwaniu Użytkownika:', error);
        }
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };
    return (
        <>
            <Navbar/>
            <Paper style={{padding: '20px', margin: '20px'}}>
                <Grid container spacing={2}>
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} md={4} key={user.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{user.imie} {user.nazwisko}</Typography>
                                    <Typography color="textSecondary">ID: {user.id}</Typography>
                                    <Typography color="textSecondary">Email: {user.email}</Typography>
                                    <Typography color="textSecondary">Rola: {user.rola}</Typography>
                                    <Button style={{margin: '10px'}}
                                            onClick={() => setSelectedUser(user)}>Aktualizuj</Button>
                                    <Button color="secondary" onClick={() => handleDelete(user.id)}>Usuń</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
            {selectedUser && (
                <UpdateUserForm
                    user={selectedUser}
                    onClose={handleClose}
                    onSubmit={(userId, formData) => {
                        handleUpdate(userId, formData);
                        setSelectedUser(null);
                    }}
                />
            )}
        </>
    );
};
export default UsersView;
