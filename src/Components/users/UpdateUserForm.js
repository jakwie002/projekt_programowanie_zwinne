import React, {useState} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select} from '@mui/material';

export const UpdateUserForm = ({user, onSubmit, onClose}) => {
    const roleToId = {
        "Administrator": "1",
        "Kierowca": "2",
        "Serwisant": "3",
        "Użytkownik": "4"
    };
    const [formData, setFormData] = useState({
        email: user.email,
        id: user.id,
        imie: user.imie,
        nazwisko: user.nazwisko,
        funkcje_id: roleToId[user.rola] || '',
    });

    const handleChange = (e) => {
        if (e.target.name === "funkcje_id") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                rola: Object.keys(roleToId).find(key => roleToId[key] === e.target.value)
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(user.id, formData);
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Aktualizuj Użytkownika</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField label="Imię" name="imie" value={formData.imie} onChange={handleChange} fullWidth
                               margin="normal"/>
                    <TextField label="Nazwisko" name="nazwisko" value={formData.nazwisko} onChange={handleChange}
                               fullWidth margin="normal"/>
                    <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth
                               margin="normal"/>
                    <Select
                        label="Rola"
                        name="funkcje_id"
                        value={formData.funkcje_id}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Wybierz rolę</MenuItem>
                        {Object.entries(roleToId).map(([name, id]) => (
                            <MenuItem key={id} value={id}>{name}</MenuItem>
                        ))}
                    </Select>
                    <TextField label="Hasło" name="haslo" type="password" value={formData.haslo} onChange={handleChange}
                               fullWidth margin="normal"/>
                    <DialogActions>
                        <Button type="submit">Aktualizuj</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};
