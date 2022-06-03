import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../features/Login/authReducer";
import {appointmentReducer} from "../features/Appointment/appointmentReducer";
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    appointment: appointmentReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type RootState = ReturnType<typeof store.getState>

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector