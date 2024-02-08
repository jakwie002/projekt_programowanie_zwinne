import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

export const CreateTeamForm = ({ open, onClose }) => {
    const [teamName, setTeamName] = useState('');

    const handleSubmit = async (event) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/create_zespol', {
                nazwa: teamName
            },config);
            console.log(response.data);
            onClose();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Utwórz Zespół</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nazwa Zespołu"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <DialogActions>
                        <Button onClick={onClose}>Anuluj</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Utwórz
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};
