function regionReducer(state = {activeRegion: 'OR'}, action) {
    switch (action.type) {
        case 'region/setRegion':
            return {
                ...state,               //copy state
                activeRegion: action    //overwrite region
            }
        default:
            return state
    }
}

export default regionReducer