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

const vaccFields = [
    {field: 'vaccinesDistributed', color: 'hsl(42, 70%, 50%)', label: 'Distributed'},
    {field: 'vaccinesAdministered', color: 'hsl(206, 70%, 50%)', label: 'Administered'},
    {field: 'vaccinationsInitiated', color: 'hsl(100, 70%, 50%)', label: 'Initiated'},
    {field: 'vaccinationsCompleted', color: 'hsl(326, 70%, 50%)', label: 'Completed'},
]

export const allLineChartData = state => {
    const vaccineTimeseries = selectVaccineData(state)
    if (vaccineTimeseries === undefined)
        return undefined

    return vaccFields.map(z => {
        const aggregates = monthlyAggregate(vaccineTimeseries, z.field)
        return formatAsNivoLineData(z.label, z.color, aggregates)
    })
}

const monthlyAggregate = (timeseries, field) => {
    let aggregated = timeseries
        .map(slice => ({
            x: slice.date,
            y: slice[field],
        }))
    aggregated = aggregated.reduce(aggregateMonths, {})
    // Reformat back to series
    return Object.keys(aggregated).map(m => ({ x: m, y: aggregated[m] }))
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const aggregateMonths = (acc, pt) => {
    const date = new Date(pt.x)
    const month = `${MONTHS[date.getMonth()]}-${date.getFullYear()}`
    if (month in acc) {
        acc[month] += pt.y
    } else {
        acc[month] = pt.y
    }
    return acc
}

const formatAsNivoLineData = (id, color, data) => {
    return { id, color, data, }
}