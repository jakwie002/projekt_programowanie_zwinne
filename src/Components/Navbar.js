import React from 'react'
import {AppBar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import {Link} from 'react-router-dom'
import AuthService from "../Service/AuthService";

const Navbar = () => {
    const userJson = localStorage.getItem('user')
    const user = JSON.parse(userJson)
    // const isAdmin = user?.roles.some(role => role === 'ADMIN') ? true : false

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        ServiceAPP </Typography>
                    <Button color="inherit" component={Link} to="/dashboard">                         Home                     </Button>
                  <Button color="inherit" onClick={() => AuthService.logout()} component={Link} to="/login">
                        Wyloguj się
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>

    )
}

export default Navbar
