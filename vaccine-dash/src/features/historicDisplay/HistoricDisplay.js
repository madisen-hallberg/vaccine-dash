import { useSelector } from 'react-redux'
import { selectActiveRegion } from '../regionSelector/regionSlice'


export default function HistoricDisplay() {
    const activeRegion = useSelector(selectActiveRegion)

    return (
        <section>
            <h2>Vaccine Over Time</h2>
            <p>test: {activeRegion}</p>
            <p>Some chart goes here...</p>
        </section>
    )
}