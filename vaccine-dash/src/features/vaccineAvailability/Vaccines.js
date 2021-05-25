import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DataGrid } from '@material-ui/data-grid'

import { selectActiveRegion } from '../regionSelector/regionSlice'
import { availabilityData, fetchAvailabilityData } from './vaccineSlice'

const headers = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'provider', headerName: 'Provider', width: 130 },
    { field: 'address', headerName: 'Address', width: 280 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'state', headerName: 'State', width: 120 },
    { field: 'appointments', headerName: 'Appointments Available', width: 300 }
]

function AvailableVaccines() {
    const dispatch = useDispatch()

    const region = useSelector(selectActiveRegion)
    const loadStatus = useSelector(state => state.vaccines.status)
    const availability = useSelector(availabilityData)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchAvailabilityData(region.code))
        }
    }, [loadStatus, dispatch, region])

    const rowData = availability.map(provider => ({
        ...provider,
        appointments: provider.appointments.length
    }))

    return (
        <div>
            <h1>Vaccine Availability</h1>
            {loadStatus==='loading' && <p>Loading...</p>}
            {loadStatus !== 'loading' &&
                <div style={{ height: 520, width: '100%' }}>
                    <DataGrid rows={rowData} columns={headers} pageSize={20} />
                </div>
            }
        </div>
    )
}

export default AvailableVaccines;