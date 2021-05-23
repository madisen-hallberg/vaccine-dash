import { createSlice } from '@reduxjs/toolkit'

export const regionSlice = createSlice({
    name: 'region',
    initialState: {
        code: 'OR'
    },
    reducers: {
        setRegion: (state, action) => {
            state.code = action.payload
        }
    }
})

// Selector functions
export const selectRegion = state => state.region

export const { setRegion } = regionSlice.actions

export default regionSlice.reducer