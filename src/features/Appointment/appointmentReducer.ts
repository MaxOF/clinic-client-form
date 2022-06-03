import {setAppError, SetAppErrorType} from "../../app/appReducer";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {AddUserType, appointmentAPI, authAPI, NewAppointmentType} from "../../api/api";
import {AxiosError, AxiosResponse} from "axios";


//types >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



type InitialStateType = {
    createdAppointment: boolean
}
export const initialState = {
    createdAppointment: false
}

export const appointmentReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APPOINTMENT/ADD-APPOINTMENT':
            return {...state, createdAppointment: action.success}
        default:
            return state
    }
}

//types for actions

type ActionsType = AddAppointmentType

export type AddAppointmentType = ReturnType<typeof addAppointment>

//actions
export const addAppointment = (success: boolean) => ({type: 'APPOINTMENT/ADD-APPOINTMENT', success} as const)



export type DispatchThunkAppointment = ActionsType | SetAppErrorType
type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, DispatchThunkAppointment>


export const createAppointment = (newAppointment: NewAppointmentType): ThunkType => (dispatch) => {
    return appointmentAPI.createAppointment(newAppointment)
        .then((res: AxiosResponse) => {
            dispatch(addAppointment(true))
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong add user 😠'))
        })
}