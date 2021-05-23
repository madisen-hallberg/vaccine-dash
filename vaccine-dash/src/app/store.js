// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import regionReducer from '../features/regionSelector/regionSlice'

export default configureStore(
    {
        reducer: {
            region: regionReducer
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)