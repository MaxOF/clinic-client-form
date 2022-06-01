


//types >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export type UserType = {
    id: number
    email: string
    password: string
}

export type InitialStateType = {
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
        default:
            return state
    }
}

//types for actions

type ActionsType = setIsLoggedInType

export type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>


//actions
export const setIsLoggedIn = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const)