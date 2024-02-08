import React from 'react';
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const userRole = localStorage.getItem('role_id');

    let tiles = [];

    if (userRole === "1") {
        // Admin
        tiles = [
            { name: "Wszystkie usterki", link: "/data-actions" },
            { name: "Użytkownicy", link: "/users" },
            { name: "Zespoły", link: "/teams" },
            // { name: "Akcje Danych", link: "/data-actions" },
            { name: "Zarządzanie Samochodami", link: "/car" },
            { name: "Przypisz Usterkę", link: "/assign_usterka_to_zespol" },
            
        ];
    } else if (userRole === "3") {
        // Serwisant
        tiles = [
            { name: "Moje Usterki", link: "/serwisant-issues" },
            
            
        ];
    } else if (userRole === "2") {
        // Kierowca
        tiles = [
            { name: "Zgłoś Usterkę", link: "/add-issue" },
            { name: "Moje Usterki", link: "/my-issues" },
        ];
    }

    return (
        <div>
            <Navbar />
            <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard {userRole}
                </Typography>
                <Grid container spacing={2}>
                    {tiles.map((tile, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea component={Link} to={tile.link}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {tile.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default Dashboard;
