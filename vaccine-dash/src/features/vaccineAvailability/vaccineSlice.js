import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// status can be either: 'pending' | 'loading' | 'complete' | 'failed'
const initialState = {
    data: [],
    status: 'pending',
    error: null
}

const states_endpoint = `https://www.vaccinespotter.org/api/v0/states/`

// Makes API call and processes response
export const fetchAvailabilityData = createAsyncThunk('vaccines/fetchData', async (region=null) => {
    let selectedRegion = region ? region : 'states'

    const res = await fetch(states_endpoint + `${selectedRegion}.json`)
    const data = await res.json()

    return data.features.map(d => d.properties)
})

/* 
 * Steps for async thunks (see: vaccineSlice.extraReducers above)
 * 1) dispatch "start" action before the request (track loading state)
 * 2) async request is made
 * 3) async logic dispatches either "success" action containing result data, or "failure" action containing details
 * 4) reducer clears the loading state
 */
export const vaccineSlice = createSlice({
    name: 'vaccines',
    initialState,
    extraReducers: {
        [fetchAvailabilityData.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchAvailabilityData.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        },
        [fetchAvailabilityData.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})


// Actions
export const { getData } = vaccineSlice.actions
// Reducer
export default vaccineSlice.reducer
// Selectors
export const availabilityData = state => state.vaccines.data
export const availabilityByState = (state, stateCode) => state.vaccines.data.filter(d => d.state === stateCode)