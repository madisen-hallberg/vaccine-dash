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
    const rows = availability.map(dat => <AvailabilityRow key={dat.id} {...dat} />)

    return (
        <div>
            <h1>Vaccines Distributed</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>State</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </div>
    )
}

function AvailabilityRow({ name, city, state }) {
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{city}</TableCell>
            <TableCell>{state}</TableCell>
        </TableRow>
    )
}

export default AvailableVaccines;