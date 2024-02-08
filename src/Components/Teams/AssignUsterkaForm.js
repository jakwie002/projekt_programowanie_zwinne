import React, {useState, useEffect} from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Select, MenuItem, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export const AssignUsterkaForm = ({open, onClose}) => {
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedUsterka, setSelectedUsterka] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [page, setPage] = useState(0); // Assuming page starts at 0
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getUsers();
        getZespoły();
    }, []);

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

    const getZespoły = async () => {
        try {
            const token = localStorage.getItem('token'); // Pobranie tokena
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            const response = await axios.get('http://127.0.0.1:5000/api/get_zespoly', config);
            const teamsData = response.data.zespoly;
            const transformedTeams = Object.keys(teamsData).map(key => {
                return {
                    nazwa: key,
                    id: teamsData[key].id_zespolu,
                    czlonkowie: teamsData[key].czlonkowie
                };
            });

            setTeams(transformedTeams);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu danych zespołów:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.post('http://127.0.0.1:5000/api/assign_user_to_zespol', {
            uzytkownik_id: selectedUsterka,
            zespol_id: selectedTeam
        }, config)
        .then(response => {
            // Obsługa odpowiedzi sukcesu
            setSuccessMessage(response.data);
            alert("Operacja przypisania zakończona sukcesem.");
            onClose(); // Close the dialog after submission
        })
        .catch(error => {
            // Obsługa błędów
            const errorMessage = error.response && error.response.data 
                ? error.response.data.message 
                : 'Wystąpił błąd przy przypisywaniu usterki do zespołu.';
            alert(errorMessage);
        });
    };
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Przypisz użytkownika do zespołu</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Użytkownik</InputLabel>
                            <Select
                                value={selectedUsterka}
                                onChange={(e) => setSelectedUsterka(e.target.value)}
                                label="Użytkownik"
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.imie} {user.nazwisko}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Zespół</InputLabel>
                            <Select
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                                label="Zespół"
                            >
                                {teams.map((team) => (
                                    <MenuItem key={team.id} value={team.id}>
                                        {team.nazwa}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={onClose}>Anuluj</Button>
                            <Button type="submit" variant="contained" color="primary">
                                Przypisz
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={successMessage ? "success" : "error"} sx={{ width: '100%' }}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
    
};
