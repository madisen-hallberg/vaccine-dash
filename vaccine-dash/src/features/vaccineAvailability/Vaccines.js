import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { selectActiveRegion } from '../regionSelector/regionSlice'
import { availabilityData, fetchAvailabilityData } from './vaccineSlice'


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


    const loadingMsg = <p>Loading...</p>

    return (
        <div>
            <h1>Vaccine Availability</h1>
            {loadStatus==='loading' && loadingMsg}
            {loadStatus !== 'loading' &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Provider</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Avail. Appts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {availability.map(dat => <AvailabilityRow key={dat.id} {...dat} />)}
                    </TableBody>
                </Table>
            }
        </div>
    )
}

function AvailabilityRow({ name, provider, address, city, state, appointments }) {
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{provider}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{city}</TableCell>
            <TableCell>{state}</TableCell>
            <TableCell>{appointments.length}</TableCell>
        </TableRow>
    )
}

export default AvailableVaccines;