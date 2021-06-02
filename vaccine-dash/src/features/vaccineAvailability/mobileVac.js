import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DataGrid } from '@material-ui/data-grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container';


import { activeRegionCode } from '../regionSelector/regionSlice'
import { fetchAvailabilityData } from './mobileVacSlice'

const headers = [
    { field: 'provider', headerName: 'Provider', width:75 },
    { field: 'address', headerName: 'Location', width: 180 },
    { field: 'appointments', headerName: '#', width: 85 }
]

function MobileAvailableVaccines() {
    const dispatch = useDispatch()

    const region = useSelector(activeRegionCode)
    const loadStatus = useSelector(state => state.vaccines.status)
    const availability = useSelector(state => state.vaccines.data)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchAvailabilityData(region))
        }
    }, [loadStatus, dispatch, region])

    const rowData = availability.filter((e) => {
        return e.appointments.length;
    }
    ).map(provider => ({
        ...provider,
        appointments: provider.appointments.length

    }))

    return (
        <div className = 'homecontainer'>
            <h2 className ='tabletitle'>Vaccine Availability</h2>
            <div>
                {loadStatus==='loading' && <CircularProgress />}
                {loadStatus === 'succeeded' &&
                    <Container fixed className="table">

                        <DataGrid rows={rowData} columns={headers} pageSize={4} />
                    </Container>
                }
            </div>
            
        </div>
    )
}

export default MobileAvailableVaccines;