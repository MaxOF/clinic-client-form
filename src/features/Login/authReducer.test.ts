import {
    addUserAC,
    authReducer,
    InitialStateType, setIsAuth, setIsLoggedIn, setUsers
} from "./authReducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        isLoggedIn: false,
        users: [
            {
                "id": 1,
                "email": "crokster1996@gmail.com",
                "password": "123456789"
            },
            {
                "email": "asd@mail.ru",
                "password": "1234567",
                "id": 3
            },
            {
                "email": "ctraining1111@gmail.com",
                "password": "111111111",
                "id": 4
            }
        ],
        isAuth: false,
        signUp: false,
        user: ''
    };
});

test('isLoggedIn should be set in correct way', () => {
    const endState = authReducer(startState, setIsLoggedIn(true))
    expect(endState.isLoggedIn).toBe(true)
});

test('users should be set in correct way', () => {
    const endState = authReducer(startState, setUsers([
        {
            "id": 2,
            "email": "crokster@gmail.com",
            "password": "87654321"
        },
        {
            "id": 5,
            "email": "mockDB@gmail.com",
            "password": "12345678"
        }]))
    expect(endState.users.length).toBe(2)
    expect(endState.users[1]).toStrictEqual({
        "id": 5,
        "email": "mockDB@gmail.com",
        "password": "12345678"
    })
    expect(endState.users[0].email).toBe("crokster@gmail.com")

});

test('isAuth should be set in correct way', () => {
    const endState = authReducer(startState, setIsAuth(true))
    expect(endState.isAuth).toBe(true)
});
test('signUp should be set in correct way', () => {
    const endState = authReducer(startState, addUserAC(true))
    expect(endState.signUp).toBe(true)
});



