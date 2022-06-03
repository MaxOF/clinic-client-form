import {addAppointment, appointmentReducer, InitialStateType} from "./appointmentReducer";


let startState: InitialStateType

beforeEach(() => {
    startState = {
        createdAppointment: false
    };
})

test('create appointment should be set in correct way', () => {
    const endState = appointmentReducer(startState, addAppointment( true))
    expect(endState.createdAppointment).toBe(true)
});

