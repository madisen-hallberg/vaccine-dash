import { configureStore } from '@reduxjs/toolkit'
import regionReducer from '../features/regionSelector/regionSlice'
import vaccineReducer from '../features/vaccineAvailability/vaccineSlice'
import historicReducer from '../features/historicDisplay/historicSlice'

export default configureStore(
    {
        reducer: {
            region: regionReducer,
            vaccines: vaccineReducer,
            historic: historicReducer
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)