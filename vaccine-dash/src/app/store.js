import { configureStore } from '@reduxjs/toolkit'
import regionReducer from '../features/regionSelector/regionSlice'
import vaccineReducer from '../features/vaccineAvailability/vaccineSlice'

export default configureStore(
    {
        reducer: {
            region: regionReducer,
            vaccines: vaccineReducer,
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)