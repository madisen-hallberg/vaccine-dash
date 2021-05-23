import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchHistoricData, allHistoricData } from './historicSlice'

// TODO: filter by activeRegion
export default function HistoricDisplay() {
    const dispatch = useDispatch()
    const data = useSelector(allHistoricData)
    const loadStatus = useSelector(state => state.historic.status)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchHistoricData)
        }
    }, [loadStatus, dispatch])

    return (
        <section>
            <h2>Vaccine Over Time</h2>
            <p>Some chart goes here...</p>
        </section>
    )
}