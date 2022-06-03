import React from 'react';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {
    Box,
    Button, Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
    RadioGroup, Select,
    TextField
} from "@mui/material";
import Radio from '@mui/material/Radio';
import ReactDadataBox from 'react-dadata-box';
import PhoneInput from 'react-phone-input-2'
import styles from './Appointment.module.scss'

import {createAppointment, DispatchThunkAppointment} from "./appointmentReducer";
import {AppRootStateType} from "../../app/store";




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
                errors.fullName = 'ФИО is required field'
            }
            if (!values.birth) {
                errors.birth = 'Дата рождения is required field'
            }
            if (!values.groupClients) {
                errors.groupClients = 'Группа клиентов is required field'
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
                <Grid item container xs={12} sm={12} md={10} lg={7} xl={7}>
                    <h1>Form of appointment to our best doctors</h1>
                    <span> If it possible fill all fields, but if you don`t have enough time fill all required fields:</span>
                    <span style={{fontWeight: 'bold', marginTop: '10px', minWidth: '400px'}}>ФИО, Дата Рождения, Группа клиентов</span>
                    <span style={{marginTop: '10px'}}>Thanks that you`re using our service!</span>
                </Grid>
                <Grid container item xs={12} sm={12}  md={10} lg={7} xl={7} style={{marginTop: '30px'}}>
                    <Grid item xs={12} sm={12}  md={7} lg={7} xl={7} className={styles.fio}>
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
                            style={formik.touched.fullName && formik.errors.fullName ? {
                                border: '1px solid red',
                                width: '300px',
                                height: '38px',
                                borderRadius: '4px',
                            } : undefined}
                        />
                        <div style={{
                            color: 'red',
                            margin: '5px 0px 0px 10px'
                        }}>{formik.touched.fullName && formik.errors.fullName ?
                            formik.errors.fullName : null}</div>
                    </Grid>
                    <Grid item xs={12} sm={12}  md={5} lg={5} xl={5} className={styles.birth}>
                        <div style={{marginBottom: '15px'}}>
                            Дата Рождения
                        </div>
                        <TextField
                            type="date"
                            {...formik.getFieldProps('birth')}
                            inputProps={{max: new Date().toISOString().slice(0, 10)}}
                            style={formik.touched.fullName && formik.errors.fullName ? {
                                border: '1px solid red',
                                borderRadius: '4px'
                            } : undefined}
                        />
                        <div style={{
                            color: 'red',
                            margin: '5px 0px 0px 10px'
                        }}>{formik.touched.birth && formik.errors.birth ?
                            formik.errors.birth : null}</div>
                    </Grid>
                    <Grid item xs={12} sm={12}  md={7} lg={7} xl={7} className={styles.phone}>
                        <div style={{marginBottom: '15px'}}>
                            Номер телефона
                        </div>
                        <PhoneInput
                            onChange={(value) => {
                                formik.handleChange(value)
                                formik.values.telNumber = value
                                return value
                            }}
                            specialLabel={''}
                            country={'ru'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}  md={5} lg={5} xl={5} style={{paddingBottom: '40px'}}>
                        <div style={{marginBottom: '15px'}}>
                            Пол
                        </div>
                        <RadioGroup
                            row aria-label="position"
                            name="gender"
                            defaultValue="top"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel
                                value="мужской"
                                control={<Radio color="primary"/>}
                                label="мужской"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="женский"
                                control={<Radio color="secondary"/>}
                                label="женский"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7} xl={7} className={styles.groupClients}>
                        <div style={{marginBottom: '15px'}}>
                            Группа клиентов
                        </div>
                        <Select
                            name="groupClients"
                            value={formik.values.groupClients}
                            onChange={formik.handleChange}
                            className={styles.selectClient}
                            style={formik.touched.fullName && formik.errors.fullName ? {
                                border: '1px solid red',
                                borderRadius: '4px'
                            } : undefined}
                        >
                            <MenuItem value={'VIP'}>VIP</MenuItem>
                            <MenuItem value={'Проблемные'}>Проблемные</MenuItem>
                            <MenuItem value={'ОМС'}>ОМС</MenuItem>
                            <MenuItem value={'ДМС'}>ДМС</MenuItem>
                        </Select>
                        <div style={{
                            color: 'red',
                            margin: '5px 0px 0px 10px'
                        }}>{formik.touched.groupClients && formik.errors.groupClients ?
                            formik.errors.groupClients : null}</div>
                    </Grid>


                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={styles.doctor}>
                        <div style={{marginBottom: '15px'}}>
                            Лечащий врач
                        </div>
                        <Select
                            name="doctor"
                            value={formik.values.doctor}
                            onChange={formik.handleChange}
                            className={styles.selectDoctor}
                        >
                            <MenuItem value={'Петров'}>Петров</MenuItem>
                            <MenuItem value={'Захаров'}>Захаров</MenuItem>
                            <MenuItem value={'Черниговская'}>Черниговская</MenuItem>
                        </Select>
                    </Grid>
                    <Grid className={styles.sms}>
                        Отправить мне СМС с подтверждением
                        <Checkbox
                            name={'sms'}
                            checked={formik.values.sms}
                            onChange={formik.handleChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </Grid>
                </Grid>
                <Button style={{width: '188px'}} color="primary" variant="contained"
                        type="submit">
                    Отправить заявку
                </Button>


            </Box>

        </form>
    );
};
