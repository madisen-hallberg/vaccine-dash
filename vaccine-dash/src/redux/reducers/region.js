function regionReducer(state = {activeRegion: 'OR'}, action) {
    switch (action.type) {
        case 'CHANGE_REGION':
            return {
                // copy state
                ...state,
                // overwrite region
                activeRegion: action.payload.selectedRegion
            }
        default:
            return state
    }
}

export default regionReducer