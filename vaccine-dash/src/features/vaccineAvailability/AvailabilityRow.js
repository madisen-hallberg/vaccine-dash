import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

export default function AvailabilityRow({ name, provider, address, city, state, appointments }) {
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