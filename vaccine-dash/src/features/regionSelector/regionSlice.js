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


export const { setRegion } = regionSlice.actions

export default regionSlice.reducer

// Selector functions
export const activeRegionCode = state => state.region.code
