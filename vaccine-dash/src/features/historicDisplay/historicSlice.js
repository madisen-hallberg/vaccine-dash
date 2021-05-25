import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    status: 'pending',
    error: null
}

const url = `https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`

export const fetchHistoricData = createAsyncThunk('historic/fetchData', async (region) => {
    const res = await fetch(url)
    let data = await res.json()
    data = data.filter(d => d.state === region)
    return data[0]
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
// export const historicByState = (state, region) => state.historic.data.filter(d => d.state === region)