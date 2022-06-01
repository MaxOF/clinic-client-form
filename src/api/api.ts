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

export type BaseResponseType <D ={}> = {
    data: D
}
export type AddUserType = {
    email: string
    password: string
}