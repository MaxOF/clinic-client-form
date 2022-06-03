import React, {useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";

import {Appointment} from "./features/Appointment/Appointment";
import {SignUp} from "./features/SignUp/SignUp";
import {ErrorPage} from "./features/ErrorPage/ErrorPage";
import {Login} from "./features/Login/Login";
import {AppRootStateType, useAppSelector} from "./app/store";
import {DispatchThunkAuth, loginTC, setIsAuth, setIsLoggedIn} from "./features/Login/authReducer";
import {SnackBar} from "./utils/SnackBar";
import {setAppError} from "./app/appReducer";

import './App.css';

export enum pathEnum {
    main = '/',
    login = '/login',
    signUp = '/registration',
    error = '/error',
    empty = '/*'
}


function App() {

    const {users, isLoggedIn} = useAppSelector(state => state.auth)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, DispatchThunkAuth>>()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(loginTC())
    }, [])

    useEffect(() => {
        const localState = localStorage.getItem('user')
        if (localState === null) {
            navigate(pathEnum.login)
            dispatch(setAppError('You are not authorized 😠'))
        }
        const user = JSON.parse(localState || '{}')
        const filteredEmail = users.filter(f => f.email === user.email)
        if (filteredEmail.length) {
            if (filteredEmail[0].password === user.password) {
                dispatch(setIsAuth(true))
                dispatch(setIsLoggedIn(true))
            }
        } else {
            navigate(pathEnum.login)
        }
    }, [users])

    const logoutHandler = () => {
        localStorage.removeItem('user')
        dispatch(setIsLoggedIn(false))
        dispatch(setIsAuth(false))
        navigate(pathEnum.login)
    }


    return (
        <div className="App">
            <SnackBar/>
            <AppBar position={'static'} style={{borderRadius: '10px'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} style={{padding: '10px'}}>
                        Appointment to doctor
                    </Typography>
                    {isLoggedIn && <Button color='inherit' onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
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
