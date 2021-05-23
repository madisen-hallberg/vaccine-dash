/* 
 *
 * Think of redux actions as an event that describes something
 * that happened in the application.
 * 
 * Actions are plain JS objects w/ a 'type' field, and optionally,
 * additional information in 'payload' (object or primitive values)
 * 
 */

// Action creators
const changeRegion = (selection) => ({
    type: 'region/setRegion',
    payload: selection
})

// Requested vaccine data based on activeRegion
const getVaccineData = () => ({
    type: 'vaccine/getVaccineData'
})

export default changeRegion
