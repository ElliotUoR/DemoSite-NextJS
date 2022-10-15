import { createSlice } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        theme: 0,
        sorter: 0,
        interval: 500,
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        toggleTheme: (state, action) =>{
            state.theme = action.payload
        },
        setTheme: (state, action) =>{
            state.theme = action.payload
        },
        setSorter: (state, action) =>{
            state.sorter = action.payload
        },
        setInterval: (state, action) => {
            state.interval = Math.max(50,Math.min(1000,action.payload));
        }
    },
})

export const {increment, decrement,incrementByAmount, toggleTheme, setTheme,setSorter, setInterval} = counterSlice.actions

export default counterSlice.reducer