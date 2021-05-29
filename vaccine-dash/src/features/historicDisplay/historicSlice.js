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
export const selectVaccineData = state => {
    const data = state.historic.data.actualsTimeseries

    if (data === undefined) return undefined

    let res = data.map(d => {
        const {
            vaccinesDistributed,
            vaccinationsInitiated,
            vaccinationsCompleted,
            vaccinesAdministered,
            date,
        } = d
        return { vaccinesDistributed, vaccinationsInitiated, vaccinationsCompleted, vaccinesAdministered, date }
    })
    
    return res.filter(d => typeof d.vaccinesDistributed === 'number')
}