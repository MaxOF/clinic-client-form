import {appReducer, setAppError} from "./appReducer";

type InitialStateType = {
    error: string | null
}

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null
    };
})

test('error message should be set in correct way', () => {
    const endState = appReducer(startState, setAppError( 'some error'))
    expect(endState.error).toBe('some error')
});

