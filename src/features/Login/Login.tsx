import React from 'react';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {useNavigate, Navigate} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel, Grid, TextField} from "@mui/material";

import {AppRootStateType, useAppSelector} from "../../app/store";
import {DispatchThunkAuth, loginTC, setIsLoggedIn} from "./authReducer";
import {pathEnum} from "../../App";
import {setAppError} from "../../app/appReducer";

type FormikErrorsType = {
    email?: string
    password?: string
}
type FormValuesType = {
    email: string
    password: string
}

export const Login = () => {

    const {isLoggedIn, users} = useAppSelector(state => state.auth)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, DispatchThunkAuth>>()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            id: 0,
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'Required field'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required field'
            } else if (values.password.length <= 6) {
                errors.password = 'The length of password must be 7 or more'
            }
            return errors
        },
        onSubmit: (values: FormValuesType) => {
            dispatch(loginTC())
            const filteredEmail = users.filter(f => f.email === values.email)
            if (filteredEmail.length) {
                if (filteredEmail[0].password === values.password) {
                    localStorage.setItem('user', JSON.stringify(values))
                    dispatch(setIsLoggedIn(true))
                    formik.resetForm()
                }
            } else {
                dispatch(setAppError('Wrong email or password 😠'))
            }
        }
    })
    const navToSignUp = () => {
        navigate(pathEnum.signUp)
    }
    if (isLoggedIn) {
        return <Navigate to={pathEnum.main} />
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit} style={{marginTop: '40px'}}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in please sign up. In order to sign up<br/>
                            click the button "Sign up"<br/>
                            or use common test account credentials:</p>
                            <p style={{fontWeight: "bold"}}>Email: example@exmp.ru<br/>
                            Password: 1234567</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label='Email'
                                margin='normal'
                                {...formik.getFieldProps('email')}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div>: null}
                            <TextField
                                label='Password'
                                margin='normal'
                                type='password'
                                {...formik.getFieldProps('password')}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: 'red'}}>{formik.errors.password}</div>: null}
                            <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop: '30px'}}>
                                Login
                            </Button>
                            <Button variant="outlined" onClick={navToSignUp} style={{margin: '30px auto'}}
                                    color={'secondary'}>Sign up</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};