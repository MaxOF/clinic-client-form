import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../features/Login/authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type RootState = ReturnType<typeof store.getState>

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector