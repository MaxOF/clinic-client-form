import React from 'react';
import {Snackbar} from "@mui/material";
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {AppRootStateType, useAppSelector} from "../app/store";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionsType, setAppError} from "../app/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar = () => {
    const {error} = useAppSelector(state => state.app)
    const {createdAppointment} = useAppSelector(state => state.appointment)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, ActionsType>>()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null));
    };

    const alertHandler = () => {
        if (error) {
            return 'error'
        } else if (createdAppointment) {
            return 'success'
        }
    }
    const messageHandler = () => {
        if (error) {
            return error
        } else if (createdAppointment) {
            return 'Appointment has created successfully'
        }
    }

    return (
        <Snackbar open={error !== null || createdAppointment !== false}  autoHideDuration={5000} onClose={handleClose}>
            <Alert severity={alertHandler()} sx={{width: '100%'}} onClose={handleClose}>
                {messageHandler()}
            </Alert>
        </Snackbar>
    );
};




