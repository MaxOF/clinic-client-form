
type InitialStateType = {
    error: string | null
}

const initialState: InitialStateType = {
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export type ActionsType = SetAppErrorType

export type SetAppErrorType = ReturnType<typeof setAppError>

export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)