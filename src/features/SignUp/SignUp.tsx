import React from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {Button, FormControl, FormGroup, FormLabel, Grid, TextField} from "@mui/material";

import {AppRootStateType} from "../../app/store";
import {addUser, DispatchThunkAuth} from "../Login/authReducer";

export const SignUp = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, DispatchThunkAuth>>()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required field'),
            password: Yup.string()
                .min(7, 'Password must be 7 characters or more')
                .required('Required field'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Password must match')
                .required('Confirm password is required'),
        }),
        onSubmit: values => {
            dispatch(addUser({email: values.email, password: values.password}))
        }
    })


    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <h2 style={{margin: '40px auto'}}>Sign Up</h2>
                            <p>In order to make an appointment please sign up<br/>
                                on our site. I know that takes your invaluable time.<br/>
                                It`s necessary.<br/>
                                Thank you for understanding:)</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal" {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: 'red'}}>{formik.errors.email}</div> :
                                null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal" {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            <TextField type="password"
                                       label="Confirm password"
                                       margin="normal" {...formik.getFieldProps('confirmPassword')}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}

                            <Button type="submit" variant={'contained'} color={'primary'} style={{margin: '20px 7px 7px 7px'}}>Sign Up</Button>
                            <Button variant="outlined" onClick={() => navigate('/login')} color='error' style={{margin: '7px 7px 30px 7px'}}>Cancel
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};