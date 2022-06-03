import axios from "axios";

import {UserType} from "../features/Login/authReducer";

const instance = axios.create({
    baseURL: 'http://localhost:7542/',
    withCredentials: true
})


export const authAPI = {
    getUsers() {
        return instance.get<UserType[]>('users')
    },
    addUser(newUser: AddUserType) {
        return instance.post<UserType>('users', newUser)
    }
}

export const appointmentAPI = {
    createAppointment(newAppointenment: NewAppointmentType) {
        return instance.post<NewAppointmentType>('appointments', newAppointenment)
    }
}

export type AddUserType = {
    email: string
    password: string
}
export type NewAppointmentType = {
    id?: string
    fullName: string
    birth: string
    telNumber?: string
    gender?: string
    groupClients: string
    doctor?: string
    sms?: boolean
}