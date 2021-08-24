import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DataGrid } from '@material-ui/data-grid'
import PlaceholderCard  from '../../components/PlaceholderCard'

import { activeRegionCode } from '../regionSelector/regionSlice'
import { fetchAvailabilityData } from './vaccineSlice'

const headers = [
    { field: 'name', headerName: 'Name', width: 240 },
    { field: 'provider', headerName: 'Provider', width: 130 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'appointments', headerName: '# Appointments', width: 190 }
]

function AvailableVaccines() {
    const dispatch = useDispatch()

    const region = useSelector(activeRegionCode)
    const loadStatus = useSelector(state => state.vaccines.status)
    const availability = useSelector(state => state.vaccines.data)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchAvailabilityData(region))
        }
    }, [loadStatus, dispatch, region])

    const rowData = availability.map(provider => ({
        ...provider,
        appointments: provider.appointments.length
    }))

    return (
        <div className = 'homecontainer'>
            <h2 className ='tabletitle'>Vaccine Availability</h2>
            <div>
                {loadStatus==='loading' && <PlaceholderCard />}
                {loadStatus === 'succeeded' &&
                    <div className="table">
                        <DataGrid rows={rowData} columns={headers} pageSize={4} />
                    </div>
                }
            </div>
            
        </div>
    )
}

export default AvailableVaccines;