import React, {ChangeEvent} from 'react';
import {
    Box,
    Button, Checkbox, Container,
    FormControl, FormControlLabel,
    FormGroup, FormLabel,
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
import {AppRootStateType} from "../../app/store";
import styles from './Appointment.module.scss'


//types for formik >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
                errors.fullName = 'Full name is required field'
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
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{flexGrow: 1}} style={{margin: '20px 60px 30px 60px'}}>
                <Grid item container md={7}>
                    <h1>Form of appointment to our best doctors</h1>
                    <span> If it possible fill all fields, but if you don`t have enough time fill all required fields:</span>
                    <span style={{fontWeight: 'bold', marginTop: '10px', minWidth: '400px'}}>ФИО, Дата Рождения, Группа клиентов</span>
                    <span style={{ marginTop: '10px'}}>Thanks that you`re using our service!</span>
                </Grid>
                <Grid container item md={7} style={{marginTop: '30px'}}>
                    <Grid item xs={7} style={{border: '1px solid black'}} className={styles.fio}>
                        <div style={{marginBottom: '15px'}}>
                            ФИО
                        </div>
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
                            placeholder='Иванов Иван Иванович'
                            style={formik.touched.fullName && formik.errors.fullName ? {border: '1px solid indianred'} : undefined}
                        />
                        {formik.touched.fullName && formik.errors.fullName ?
                            <div style={{color: 'indianred'}}>{formik.errors.fullName}</div> : null}
                    </Grid>
                    <Grid item md={5} style={{border: '1px solid black'}} className={styles.birth}>
                        <div style={{marginBottom: '15px'}}>
                             Дата Рождения
                        </div>
                        <TextField
                            type="date"
                            {...formik.getFieldProps('birth')}
                            inputProps={{max: new Date().toISOString().slice(0, 10)}}

                        />
                        {formik.touched.birth && formik.errors.birth ?
                            <div style={{color: 'indianred'}}>{formik.errors.birth}</div> : null}
                    </Grid>
                    <Grid item xs={4} style={{border: '1px solid black'}}>
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
                    <Grid item xs={8} style={{border: '1px solid black'}}>
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
                    <Grid item xs={8} style={{border: '1px solid black'}}>
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
                    </Grid>
                    <Grid item xs={4} style={{border: '1px solid black'}}>
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
                    </Grid>
                    <Grid style={{border: '1px solid black'}}>
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
                    </Grid>
                </Grid>
            </Box>

            <Button color="primary" variant="contained" fullWidth type="submit" size={"medium"}>
                Send appointment
            </Button>
        </form>
    );
};
