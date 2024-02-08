import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const UpdateUsterkaDialog = ({ open, handleClose, komentarz, setKomentarz, nowyStatusId, setNowyStatusId, handleSave }) => {
    const statusMap = {
        1: 'Oczekuje',
        2: 'W trakcie',
        3: 'Rozwiązane',
        4: 'Zamknięte'
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Aktualizuj Usterkę</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="komentarz"
                        label="Komentarz Serwisanta"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={komentarz}
                        onChange={(e) => setKomentarz(e.target.value)}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            value={nowyStatusId}
                            label="Status"
                            onChange={(e) => setNowyStatusId(Number(e.target.value))}
                        >
                            {Object.entries(statusMap).map(([key, value]) => (
                                <MenuItem key={key} value={key}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anuluj</Button>
                <Button onClick={handleSave}>Zapisz</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateUsterkaDialog;