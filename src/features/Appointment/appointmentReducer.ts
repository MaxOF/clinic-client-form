import {AxiosError, AxiosResponse} from "axios";
import {ThunkAction} from "redux-thunk";

import {setAppError, SetAppErrorType} from "../../app/appReducer";
import {AppRootStateType} from "../../app/store";
import {appointmentAPI, NewAppointmentType} from "../../api/api";



//types >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

type InitialStateType = {
    createdAppointment: boolean
}

//initial state >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const initialState = {
    createdAppointment: false
}

//reducer>>>>>>>>>>>>>
export const appointmentReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APPOINTMENT/ADD-APPOINTMENT':
            return {...state, createdAppointment: action.success}
        default:
            return state
    }
}

//types for actions>>>>>>>>>>>>>
type ActionsType = AddAppointmentType
export type AddAppointmentType = ReturnType<typeof addAppointment>

//actions>>>>>>>>>>>>>
export const addAppointment = (success: boolean) => ({type: 'APPOINTMENT/ADD-APPOINTMENT', success} as const)

//thunk types>>>>>>>>>>>>>

export type DispatchThunkAppointment = ActionsType | SetAppErrorType
type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, DispatchThunkAppointment>

//thunks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const createAppointment = (newAppointment: NewAppointmentType): ThunkType => (dispatch) => {
    return appointmentAPI.createAppointment(newAppointment)
        .then((res: AxiosResponse) => {
            dispatch(addAppointment(true))
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong add user 😠'))
        })
}