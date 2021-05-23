import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchVaccineData } from '../vaccines/vaccineSlice'

const initialState = {
    data: [],
    status: 'pending',
    error: null
}

const url = `https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`

export const fetchHistoricData = createAsyncThunk(
    'historic/fetchData',
    async () => {
        const res = await fetch(url)
        return res.json()
    }
)

const historicSlice = createSlice({
    name: 'historic',
    initialState,
    extraReducers: {
        [fetchHistoricData.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchHistoricData.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        },
        [fetchVaccineData.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export default historicSlice.reducer
// Selectors
export const allHistoricData = (state) => state.historic.data
export const historicByState = (state, region) => state.historic.data.filter(d => d.state === region)