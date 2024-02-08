import React, {useState, useEffect} from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    CircularProgress,
    DialogTitle, DialogContent, Dialog
} from '@mui/material';
import Navbar from "../Navbar";
import axios from "axios";
import {TeamNameChangeForm} from "./TeamNameChangeForm";
import * as PropTypes from "prop-types";
import {CreateTeamForm} from "./CreateTeamForm";
import {AssignUsterkaForm} from "./AssignUsterkaForm";


const TeamsView = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogOpenA, setIsDialogOpenA] = useState(false);

    const handleOpenDialogA = () => {
        setIsDialogOpenA(true);
    };

    const handleCloseDialogA = () => {
        setIsDialogOpenA(false);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    const handleRemoveUserFromTeam = async (zespolId, uzytkownikId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            const body = {
                zespol_id: zespolId,
                uzytkownik_id: uzytkownikId
            };

            await axios.delete('http://127.0.0.1:5000/api/remove_user_from_zespol', {
                headers: { Authorization: `Bearer ${token}` },
                data: body
              });
              

            // Aktualizacja stanu po usunięciu użytkownika z zespołu
            setTeams(prevTeams => {
                return prevTeams.map(team => {
                    if (team.id === zespolId) {
                        return {
                            ...team,
                            czlonkowie: team.czlonkowie.filter(czlonek => czlonek.id !== uzytkownikId)
                        };
                    }
                    return team;
                });
            });

            console.log(`Użytkownik o ID ${uzytkownikId} został usunięty z zespołu o ID ${zespolId}.`);
        } catch (error) {
            console.error('Wystąpił błąd przy usuwaniu użytkownika z zespołu:', error);
        }
    };
    const [isLoading, setIsLoading] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleOpenEditDialog = (teamId) => {
        setSelectedTeamId(teamId);
        setIsEditDialogOpen(true);
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
    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setSelectedTeamId(null);
    };
    useEffect(() => {

        getZespoły();
    }, []);
    const handleDeleteTeam = async (teamId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            await axios.delete(`http://127.0.0.1:5000/api/delete_zespol/${teamId}`, config);
            setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
            console.log(`Zespół o ID ${teamId} został usunięty.`);
        } catch (error) {
            // Obsługa błędów
            console.error('Wystąpił błąd przy usuwaniu zespołu:', error);
        }
    };
    const handleChangeTeamName = async (teamId, newTeamName) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };

            const body = {
                nowa_nazwa: newTeamName
            };

            await axios.put(`http://127.0.0.1:5000/api/update_zespol/${teamId}`, body, config);

            // Aktualizacja stanu po zmianie nazwy zespołu
            setTeams(prevTeams => prevTeams.map(team => {
                if (team.id === teamId) {
                    return {...team, nazwa: newTeamName};
                } else {
                    return team;
                }
            }));

            console.log(`Nazwa zespołu o ID ${teamId} została zmieniona na ${newTeamName}.`);
        } catch (error) {
            console.error('Wystąpił błąd przy zmianie nazwy zespołu:', error);
        }
    };


    return (
        <>

        <Navbar/>
        <Paper>
            <Button variant="outlined" onClick={handleOpenDialog}>
                Dodaj Zespół
            </Button>
            <CreateTeamForm open={isDialogOpen} onClose={handleCloseDialog} />
            <Button variant="outlined" onClick={handleOpenDialogA}>
                Przypisz Użytkownika
            </Button>
            <AssignUsterkaForm open={isDialogOpenA} onClose={handleCloseDialogA} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID Zespołu</TableCell>
                        <TableCell>Nazwa Zespołu</TableCell>
                        <TableCell>Członkowie</TableCell>
                        <TableCell>Akcje</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((team) => (
                        <TableRow key={team.id}>
                            <TableCell>{team.id}</TableCell>
                            <TableCell>{team.nazwa}</TableCell>
                            <TableCell>
                                {team.czlonkowie.map(czlonek =>
                                    <div key={czlonek.id}>
                                        {czlonek.imie} {czlonek.nazwisko}
                                        <Button
                                            onClick={() => handleRemoveUserFromTeam(team.id, czlonek.id)}
                                            color="secondary"
                                        >
                                            Usuń z Zespołu
                                        </Button>
                                    </div>
                                )}
                        </TableCell>
                        <TableCell>
                        <Button onClick={() => handleOpenEditDialog(team.id)}>Edytuj Nazwę</Button>
                <Button onClick={() => handleDeleteTeam(team.id)}>Usuń Zespół</Button>

            </TableCell>
        </TableRow>
        ))}
        </TableBody>
{
    selectedTeamId && (
        <TeamNameChangeForm
            teamId={selectedTeamId}
            onSubmit={(teamId, newName) => {
                handleChangeTeamName(teamId, newName);
                setSelectedTeamId(null); // Zamknij formularz po wysłaniu
            }}
        />
    )
}
</Table>
</Paper>
    <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Zmień Nazwę Zespołu</DialogTitle>
        <DialogContent>
            <TeamNameChangeForm
                teamId={selectedTeamId}
                onSubmit={(teamId, newName) => {
                    handleChangeTeamName(teamId, newName);
                    handleCloseEditDialog();
                }}
            />
        </DialogContent>
    </Dialog>
{
    isLoading && <CircularProgress/>
}
</>
)
    ;
};

export default TeamsView;
