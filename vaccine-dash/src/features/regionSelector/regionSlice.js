import { createSlice } from '@reduxjs/toolkit'

export const regionSlice = createSlice({
    name: 'region',
    initialState: {
        code: 'OR',
        label: 'Oregon'
    },
    reducers: {
        setRegion: (state, action) => {
            state.region.code = action.payload
        }
    }
})

// Selector functions
export const selectRegion = state => state.region

export const { setRegion } = regionSlice.actions

export default regionSlice.reducer