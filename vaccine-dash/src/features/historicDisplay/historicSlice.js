import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    status: 'pending',
    error: null
}

export const fetchHistoricData = createAsyncThunk('historic/fetchData', async (region=null) => {
    let url;
    if (region) {
        url = `https://api.covidactnow.org/v2/state/${region}.timeseries.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`
    } else {
        url = `https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`
    }

    const res = await fetch(url)
    return await res.json()
})

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
        [fetchHistoricData.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export default historicSlice.reducer
// Selectors
export const timeSeriesData = state => state.historic.data.actualsTimeseries
export const riskLevelsTimeseries = state => state.historic.data.riskLevelsTimeseries