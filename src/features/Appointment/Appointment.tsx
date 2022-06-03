import React, {ChangeEvent} from 'react';
import {
    Box,
    Button, Checkbox,
    FormControl, FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    RadioGroup,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import ReactDadataBox from 'react-dadata-box';
import PhoneInput from 'react-phone-input-2'
import Radio from '@mui/material/Radio';

import {createAppointment, DispatchThunkAppointment} from "./appointmentReducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../../app/store";
import {SnackBar} from "../../utils/SnackBar";


type FormikErrorsType = {
    fullName?: string,
    birth?: string,
    telNumber?: string,
    gender?: string,
    groupClients?: string,
    doctor?: string,
    sms?: boolean
}
type FormValuesType = {
    fullName: string
    birth: string,
    telNumber?: string,
    gender?: string,
    groupClients: string,
    doctor?: string,
    sms?: boolean
}

export const Appointment = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, DispatchThunkAppointment>>()

    const formik = useFormik({
        initialValues: {
            fullName: '',
            birth: '',
            telNumber: '',
            gender: '',
            groupClients: '',
            doctor: '',
            sms: false
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.fullName) {
                errors.fullName = 'Required field'
            }
            if (!values.birth) {
                errors.birth = 'Required field'
            }
            if (!values.groupClients) {
                errors.groupClients = 'Required field'
            }
            return errors
        },
        onSubmit: (values: FormValuesType) => {
            dispatch(createAppointment({
                fullName: values.fullName,
                birth: values.birth,
                telNumber: values.telNumber,
                gender: values.gender,
                groupClients: values.groupClients,
                doctor: values.doctor,
                sms: values.sms
            }))
        },
    });


    return (
        <Grid container >
            <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Grid item xs={6} md={12}>
                        <ReactDadataBox
                            token="f99335723b6080f9b85bc257791d00c4f885a065"
                            type='fio'
                            query={formik.values.fullName}
                            onChange={(e) => {
                                let someValue = e.value
                                formik.handleChange(someValue)
                                formik.values.fullName = someValue
                                return someValue
                            }}
                            placeholder='Ivanov Ivan Ivanovich'
                        />
                        {formik.touched.fullName && formik.errors.fullName ?
                            <div style={{color: 'red'}}>{formik.errors.fullName}</div> : null}
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            label="Date of birth"
                            style={{marginTop: '20px'}}
                            type="date"
                            {...formik.getFieldProps('birth')}
                            inputProps={{max: new Date().toISOString().slice(0, 10)}}
                            focused
                        />
                        {formik.touched.birth && formik.errors.birth ?
                            <div style={{color: 'red'}}>{formik.errors.birth}</div> : null}
                    </Grid>
                    <Grid item xs={6} md={12}>
                            Gender :
                        <Box>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row aria-label="position"
                                    name="gender"
                                    defaultValue="top"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio color="primary"/>}
                                        label="male"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio color="primary"/>}
                                        label="female"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="unisex"
                                        control={<Radio color="primary"/>}
                                        label="unisex"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                                {formik.touched.gender && formik.errors.gender ?
                                    <div style={{color: 'red'}}>{formik.errors.gender}</div> : null}
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Box>
                            <PhoneInput
                                onChange={(value, data, e, formattedValue) => {
                                    formik.handleChange(value)
                                    formik.values.telNumber = value
                                    return value
                                }}
                                specialLabel={''}
                                country={'ru'}
                                inputStyle={{
                                    borderColor: "red"
                                }}
                            />
                        {formik.touched.telNumber && formik.errors.telNumber ?
                            <div style={{color: 'red'}}>{formik.errors.telNumber}</div> : null}
                        </Box>
                    </Grid>
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <TextField
                                name="groupClients"
                                value={formik.values.groupClients}
                                label="Group clients"
                                onChange={formik.handleChange}
                                select
                                focused
                            >
                                <MenuItem value={'VIP'}>VIP</MenuItem>
                                <MenuItem value={'Проблемные'}>Проблемные</MenuItem>
                                <MenuItem value={'ОМС'}>ОМС</MenuItem>
                                <MenuItem value={'ДМС'}>ДМС</MenuItem>
                            </TextField>
                            {formik.touched.groupClients && formik.errors.groupClients ?
                                <div style={{color: 'red'}}>{formik.errors.groupClients}</div> : null}
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth>
                            <TextField
                                name="doctor"
                                value={formik.values.doctor}
                                label="Doctor"
                                onChange={formik.handleChange}
                                select
                                focused
                            >
                                <MenuItem value={'Петров'}>Петров</MenuItem>
                                <MenuItem value={'Захаров'}>Захаров</MenuItem>
                                <MenuItem value={'Черниговская'}>Черниговская</MenuItem>
                            </TextField>
                            {formik.touched.doctor && formik.errors.doctor ?
                                <div style={{color: 'red'}}>{formik.errors.doctor}</div> : null}
                        </FormControl>
                    </Box>
                    <Box>
                        Send me a sms with confirmation
                        <Checkbox
                            name={'sms'}
                            checked={formik.values.sms}
                            onChange={formik.handleChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                        {formik.touched.sms && formik.errors.sms ?
                            <div style={{color: 'red'}}>{formik.errors.sms}</div> : null}
                    </Box>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </FormGroup>
            </form>
        </Grid>
    );
};
