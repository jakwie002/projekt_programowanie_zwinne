import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RegisterForm from "./Components/Login/Register/RegisterForm";
import LoginForm from "./Components/Login/LoginForm";
import AddIssueForm from "./Components/AddIssueForm";
import DataActionsTable from "./Components/DataActionsTable";
import CarManagement from "./Components/CarManagement";
import TeamsView from "./Components/Teams/TeamsView";
import Dashboard from "./Components/Dashboard";
import UsersView from "./Components/users/UsersView";
import MyIssues from './Components/MyIssues'
import SerwisantIssues from './Components/SerwisantIssues';
import AssignUsterkaForm from "./Components/AssignUsterkaForm"; // Import komponentu widoku zespołów

function App() {
    return (
        <Router>
            <div className="App">

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/add-issue" element={<AddIssueForm />} />
                    <Route path="/assign_usterka_to_zespol" element={<AssignUsterkaForm />} />
                    <Route path="/data-actions" element={<DataActionsTable />} />
                    <Route path='/my-issues' element={<MyIssues /> } />
                    <Route path='/serwisant-issues' element={<SerwisantIssues /> } />
                    <Route path="/car" element={<CarManagement />} />
                    <Route path="/users" element={<UsersView />} /> {/* Nowa ścieżka dla widoku użytkowników */}
                    <Route path="/teams" element={<TeamsView />} /> {/* Nowa ścieżka dla widoku zespołów */}
                </Routes>
            </div>
        </Router>
    );
}
export default App;
