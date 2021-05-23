const url = `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`

const initialState = { vaccines: [] }

// TODO: vaccineReducer Unimplemented
function vaccineReducer(state = initialState, action) {
    switch (action.type) {
        case 'vaccine/getVaccineData':
            return state
        default:
            return state
    }
}

async function getVaccineData() {
    const res = await fetch(url)
    return await res.json()
}

export default vaccineReducer