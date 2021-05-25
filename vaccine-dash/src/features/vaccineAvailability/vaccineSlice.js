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
    let data = await res.json()
    data = data.features.map(d => d.properties)
    data = data.filter(d => d.appointments_available)
    data = data.map(d => extractData(d))
    return data
})

const extractData = feature => {
    const {
        name,
        address,
        city,
        state,
        carries_vaccine,
        appointments,
        provider,
        url,
        id
    } = feature
    
    return {name, address, city, state, carries_vaccine, appointments, provider, url, id}
}

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


// Reducer
export default vaccineSlice.reducer