import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CommandsOverview from "./pages/Dashboard/Commands/CommandsOverview";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Dashboard/Users/Users";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="dashboard/commands" element={<CommandsOverview/>}/>
                <Route path="dashboard/users" element={<Users/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
