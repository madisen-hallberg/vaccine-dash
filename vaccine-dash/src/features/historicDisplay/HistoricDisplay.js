import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeRegionCode } from '../regionSelector/regionSlice'
import { fetchHistoricData, allLineChartData } from './historicSlice'

import CircularProgress from '@material-ui/core/CircularProgress'
import LineChart from '../../components/LineChart'

// TODO: filter by activeRegion
export default function HistoricDisplay() {
    const dispatch = useDispatch()
    const loadStatus = useSelector(state => state.historic.status)
    const regionCode = useSelector(activeRegionCode)
    let lineChartData = useSelector(allLineChartData)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchHistoricData(regionCode))
        }
    }, [loadStatus, dispatch, regionCode])
    
    if (lineChartData === undefined) return <CircularProgress />

    return (
        <div className='graphcontainer homecontainer'>
            <h2 className = 'graphtitle'>Vaccine Over Time</h2>
            {loadStatus !== 'succeeded' && <CircularProgress />}
            {loadStatus === 'succeeded' && <LineChart data={lineChartData} />}
        </div>
    )
}