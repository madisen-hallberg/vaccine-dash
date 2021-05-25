import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

import { useSelector, useDispatch } from 'react-redux'
import { setRegion, activeRegionCode } from './regionSlice'
import { fetchAvailabilityData } from '../vaccineAvailability/vaccineSlice'

const regions = [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "AS", "GU", "MH", "FM", "MP", "PW", "PR", "VI" ]

export default function RegionSelector() {
    const region = useSelector(activeRegionCode)
    const dispatch = useDispatch()

    const handleChange = newRegion => {
        dispatch(setRegion(newRegion))
        dispatch(fetchAvailabilityData(newRegion))
    }

    return (
        <FormControl>
            <InputLabel id='region-select-label'>State</InputLabel>
            <Select
                labelId='region-select-label'
                id='region-select'
                value={region}
                onChange={e => handleChange(e.target.value)}
            >
                {regions.map(r => <MenuItem value={r}>{r}</MenuItem>)}
            </Select>
        </FormControl>
    )
}