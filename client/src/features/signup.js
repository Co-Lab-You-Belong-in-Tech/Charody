import { createSlice } from '@reduxjs/toolkit'

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        value: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            zipCode: -1,
            accessibility: {
                kids: false,
                cats: false,
                dogs: false,
                stairs: false
            },
            days: -1,
            hosting: false
        }
    },
    reducers: {
        signup: (state, action) => {
            Object.keys(action.payload).forEach(e => {
                state.value[e] = action.payload[e]
            })
        }
    }
})

export const { signup } = signupSlice.actions
export default signupSlice.reducer