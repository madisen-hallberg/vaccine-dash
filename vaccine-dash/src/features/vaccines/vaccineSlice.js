import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// status can be either: 'pending' | 'loading' | 'complete' | 'failed'
const initialState = {
    data: [],
    status: 'pending',
    error: null
}
const url = `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`

// Thunk (think of it as an action with async logic)
export const fetchVaccineData = createAsyncThunk('vaccines/fetchData', async () => {
    const res = await fetch(url)
    return res.json()
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
        [fetchVaccineData.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchVaccineData.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        },
        [fetchVaccineData.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

// Reducer
export default vaccineSlice.reducer
// Selectors
export const allVaccineData = state => state.vaccines.data
export const vaccineDataByState = (state, USState) => state.vaccines.data.filter(d => d.state === USState)