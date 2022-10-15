import {configureStore} from '@reduxjs/toolkit'
import counterSlice from './CounterSlice'

export default configureStore({
    reducer:{
        counter: counterSlice,
    },
// @ts-ignore
})