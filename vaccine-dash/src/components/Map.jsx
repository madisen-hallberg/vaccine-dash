
import React, { Component } from 'react';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import mapData from '../data/states.json';
import "leaflet/dist/leaflet.css"
import '../style/main.css';
import L  from './Map/leaflet';
import Layer  from './Map/Layer';
/*import Choropleth from 'react-leaflet-choropleth'
import { useSelector } from 'react-redux'
import { allVaccineData } from '../features/vaccines/vaccineSlice'
*/



class MyMap extends Component { 

  state = {}

  componentDidMount(){
   /* const options = this.props.value || this.props.defaultValue;
    const map = L.map(this.map, options);

    this.setState({ map });
*/
    console.log(mapData);
  }

  //color

  COLORS = {
    1000: '#800026',
    500: '#BD0026',
    200: '#E31A1C',
    100: '#FC4E2A',
    50: '#FD8D3C',
    20: '#FEB24C',
    10: '#FED976',
    0: '#FFEDA0',
  };

  
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

stateStyle = (feature) =>{
  return {
      fillColor: this.getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}


handleInfo = info => {
  info.onAdd = function( map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function(props) {
    this._div.innerHTML = `
    <h4>US Population Density</h4>
    ${
      props
        ? `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>`
        : 'Hover over a state'
    }`;
  };

  this.info = info;
};





//interaction
highlightFeature = (event) =>{
  event.target.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

}

resetHighlight = ({ target }) => {
  target.setStyle(this.stateStyle(target.feature));
};

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
        <TileLayer
          url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFkaXNlbmhhbGxiZXJnIiwiYSI6ImNrcDFvdjIyajFkNDcyb3BnbHNuZHFycnIifQ.3xjC8LSL7A0WZZEq9aQgqA'
          id = 'mapbox/light-v9' />
        <GeoJSON style={this.stateStyle} data={mapData.features} onEachFeature={this.onEachFeature} />
      </MapContainer>
    </div>);
  }

}

export default MyMap;