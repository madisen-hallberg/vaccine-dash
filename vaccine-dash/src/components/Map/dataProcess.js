const distributed_endpoint = 'https://api.covidactnow.org/v2/states.json?apiKey=38647fa3b7c14582bc7fc0853e42dd3d';

// Makes API call and processes response
const fetchDistributionData =  async() => {
    try{
        const res = await fetch(distributed_endpoint)
        let data = await res.json()
        console.log(data);
    }catch(err){
        console.error(err)
    }
}

const extractData = feature => {
    const {
        state,
        population,
        cases,
        vaccinesDistributed,
        vaccinationsInitiated,
        vaccinationsCompleted,
        vaccinesAdministered,
        url,
        id
    } = feature
    
    return {state, population, cases, vaccinesDistributed, vaccinationsInitiated, vaccinationsCompleted, vaccinesAdministered, url, id}
}

export default fetchDistributionData