import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeRegionCode } from '../regionSelector/regionSlice'
import { fetchHistoricData, selectVaccineData } from './historicSlice'

import { ResponsiveStream } from '@nivo/stream'
import CircularProgress from '@material-ui/core/CircularProgress'

// TODO: filter by activeRegion
export default function HistoricDisplay() {
    const dispatch = useDispatch()
    const loadStatus = useSelector(state => state.historic.status)
    const regionCode = useSelector(activeRegionCode)
    const vaccTimeseries = useSelector(selectVaccineData)

    useEffect(() => {
        if (loadStatus === 'pending') {
            dispatch(fetchHistoricData(regionCode))
        }
    }, [loadStatus, dispatch, regionCode])
    
    if (vaccTimeseries === undefined) return <CircularProgress />
    // Filter for past 3 months only
    let filteredData = vaccTimeseries.filter(d => {
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 1)
        return new Date(d.date).getTime() > startDate.getTime()
    })
    filteredData = filteredData.map(d => {
        delete d.date
        return d
    })

    return (
        <section className='graphcontainer boxshadow container'>
            <h2>Vaccine Over Time</h2>
            {loadStatus !== 'succeeded' && <CircularProgress />}
            {loadStatus === 'succeeded' && <StreamChart data={filteredData} />}
        </section>
    )
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const StreamChart = ({ data }) => (
    <ResponsiveStream
        data={data}
        keys={[ 'vaccinesDistributed', 'vaccinationsInitiated', 'vaccinationsCompleted', 'vaccinesAdministered' ]}
        // keys={[ 'Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques'  ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36
        }}
        axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
        offsetType="silhouette"
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#2c998f',
                size: 4,
                padding: 2,
                stagger: true
            },
            {
                id: 'squares',
                type: 'patternSquares',
                background: 'inherit',
                color: '#e4c912',
                size: 6,
                padding: 2,
                stagger: true
            }
        ]}
        fill={[
            {
                match: {
                    id: 'vaccinesDistributed'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'vaccinesAdministered'
                },
                id: 'squares'
            }
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.7 ] ] }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000'
                        }
                    }
                ]
            }
        ]}
    />
)
