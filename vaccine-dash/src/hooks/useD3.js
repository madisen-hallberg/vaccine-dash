// Adapted from Benney Au's blog post: https://www.pluralsight.com/guides/using-d3.js-inside-a-react-app

import React from 'react'
import * as d3 from 'd3'


// Link D3.js with the svg elements rendered by chart/map components
export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef()

    React.useEffect(() => {
        renderChartFn(d3.select(ref.current))
        return () => {}
    }, dependencies)

    return ref
}