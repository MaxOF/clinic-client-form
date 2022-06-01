import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import {AppBar, Box, Container, Typography} from "@mui/material";
import {Appointment} from "./features/Appointment/Appointment";
import {SignUp} from "./features/SignUp/SignUp";
import {ErrorPage} from "./features/ErrorPage/ErrorPage";
import {Login} from "./features/Login/Login";

export enum pathEnum {
    main = '/',
    login = '/login',
    signUp = '/registration',
    error = '/error',
    empty = '/*'
}


function App() {
    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position='static' style={{borderRadius: '10px'}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{padding: '10px'}}>
                        Appointment to doctor
                    </Typography>
                </AppBar>
            </Box>
            <Container fixed>
                <Routes>
                    <Route path={pathEnum.main} element={<Appointment/>}/>
                    <Route path={pathEnum.login} element={<Login/>}/>
                    <Route path={pathEnum.signUp} element={<SignUp/>}/>
                    <Route path={pathEnum.error} element={<ErrorPage/>}/>
                    <Route path={pathEnum.empty} element={<Navigate to={pathEnum.error}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
