

// TODO: create .env file
const API_KEY = '38647fa3b7c14582bc7fc0853e42dd3d'
const url = `https://api.covidactnow.org/v2/states.json?apiKey=${API_KEY}`

const initialState = {
    vaccines: [],
    activeRegion: ''
}

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