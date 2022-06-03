import {setAppError, SetAppErrorType} from "../../app/appReducer";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {AddUserType, authAPI} from "../../api/api";
import {AxiosError, AxiosResponse} from "axios";




//types >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


export type UserType = {
    id: number
    email: string
    password: string
}

type InitialStateType = {
    isLoggedIn: boolean
    users: UserType[]
    isAuth: boolean
    signUp: boolean
    user: string
}
export const initialState = {
    isLoggedIn: false,
    users: [],
    isAuth: false,
    signUp: false,
    user: ''
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'AUTH/SET-USERS':
            return {...state, users: action.users}
        case 'AUTH/SET-IS-AUTH':
            return {...state, isAuth: action.isAuth}
        case 'AUTH/ADD-USER':
            return {...state, signUp: action.success}
        default:
            return state
    }
}

//types for actions

type ActionsType = SetIsLoggedInType | SetUsersType | SetIsAuthType | AddUserACType

export type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
export type SetUsersType = ReturnType<typeof setUsers>
export type SetIsAuthType = ReturnType<typeof setIsAuth>
export type AddUserACType = ReturnType<typeof addUserAC>


//actions
export const setIsLoggedIn = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const)
export const setUsers = (users: UserType[]) => ({type: 'AUTH/SET-USERS', users} as const)
export const setIsAuth = (isAuth: boolean) => ({type: 'AUTH/SET-IS-AUTH', isAuth} as const)
export const addUserAC = (success: boolean) => ({type: 'AUTH/ADD-USER', success} as const)


export type DispatchThunkAuth = ActionsType | SetAppErrorType
type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, DispatchThunkAuth>

export const loginTC = (): ThunkType => (dispatch) => {
    return authAPI.getUsers()
        .then((res: AxiosResponse) => {
            dispatch(setUsers(res.data))
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong log in 😠'))
        })
}

export const addUser = (newUser: AddUserType): ThunkType => (dispatch) => {
    return authAPI.addUser(newUser)
        .then((res: AxiosResponse) => {
            dispatch(setUsers(res.data))
            dispatch(addUserAC(true))
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong add user 😠'))
        })
}