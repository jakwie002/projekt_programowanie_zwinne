import React, {useState} from 'react';
import {Button, DialogActions, TextField} from "@mui/material";

export const TeamNameChangeForm = ({teamId, onSubmit}) => {
    const [newName, setNewName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(teamId, newName);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Nowa Nazwa Zespołu"
                type="text"
                fullWidth
                margin="normal"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
            />
            <DialogActions>
                <Button onClick={handleSubmit} type="submit">Zmień Nazwę</Button>
            </DialogActions>
        </form>
    );
};
