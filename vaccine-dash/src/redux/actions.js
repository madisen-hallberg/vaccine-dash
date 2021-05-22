const changeRegion = (selection) => ({
    type: 'CHANGE_REGION',
    payload: {
        selectedRegion: selection
    }
})

export default changeRegion
