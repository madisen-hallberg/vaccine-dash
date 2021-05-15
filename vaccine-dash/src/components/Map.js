import { React, Component } from 'react'
import * as d3 from 'd3'
import { useD3 } from '../hooks/useD3'
import e from 'express'

class Map extends Component {
    componentDidMount() {
        const url = 'http://localhost:8080/api/map/county'
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ geoData: data }))
            .catch(err => console.log(err))
        
        this.ref = useD3(
            (svg) => {
                // TODO: render map
            },
            [this.state.geoData.length]
        )
    }

    render() {
        return (
            <svg
            // ref={this.ref}
            style={{
                height: 500,
                width: '100%',
                marginRight: 0,
                marginLeft: 0
            }}
        >
        </svg>
        )
    }
}