
import React, { Component } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from '../data/states.json';
import "leaflet/dist/leaflet.css"
import '../style/main.css';
/*import Choropleth from 'react-leaflet-choropleth'
import { useSelector } from 'react-redux'
import { allVaccineData } from '../features/vaccines/vaccineSlice'
*/

class MyMap extends Component { 

  state = {}

  componentDidMount(){
    console.log(mapData);
  }

  //color
  getColor=(d)=>{
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

  stateStyle = {
    fillColor: '#F28F3B',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.5
}

//interaction
highlightFeature = (event) =>{

  event.target.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

}

resetHighlight = (event) => {
  event.target.setStyle({
    fillColor: '#F28F3B',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.5
  });
}

zoomToFeature({ target }) {
  target._map.fitBounds(target.getBounds().pad(0.05));
}

onEachFeature = (feature, layer) =>{
  layer.on({
         mouseover: this.highlightFeature,
         mouseout: this.resetHighlight,
         click: this.zoomToFeature
     });
 }


  render() {
    return (
    <div>
      <h1>My Map</h1>
      <MapContainer id='my-leaflet-map' style={{ height: "80vh" }} zoom = {4} center = {([37.8, -96])} >
        <GeoJSON style={this.stateStyle} data={mapData.features} onEachFeature={this.onEachFeature} />
      </MapContainer>
    </div>);
  }

}

export default MyMap;