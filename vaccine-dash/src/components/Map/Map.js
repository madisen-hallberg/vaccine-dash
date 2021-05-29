
import React, { Component } from 'react';
import mapData from './states.json';
import "leaflet/dist/leaflet.css";
import  '../../style/main.css';
import L  from './leaflet';

class MyMap extends Component { 


  componentDidMount(){

    //map setup
    var map = L.map('leafletmap', { center: [37.8, -96], zoom: 4 });
    var mapboxAccessToken = 'pk.eyJ1IjoibWFkaXNlbmhhbGxiZXJnIiwiYSI6ImNrcDFvdjIyajFkNDcyb3BnbHNuZHFycnIifQ.3xjC8LSL7A0WZZEq9aQgqA';

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
      id: 'mapbox/light-v9',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    L.geoJSON(mapData).addTo(map);

    //data
    async function getData() {
      const response = await fetch('https://api.covidactnow.org/v2/states.json?apiKey=38647fa3b7c14582bc7fc0853e42dd3d')
      const data = await response.json();
      const array = await parseData(data);
      geojson = L.geoJson(mapData, {
        style: style,
        onEachFeature: onEachFeatureClosure(array)
      }).addTo(map);

      return array;
    }
    getData();

    function parseData(data) {
      let vaccinesDistributed = [];
      data.map(area => {
        const distributed = area.actuals.vaccinesDistributed;
        vaccinesDistributed.push(distributed)
        return data;
      })
      return vaccinesDistributed;
    }

    L.geoJson(mapData, {style: style}).addTo(map)

    function style(feature) {
      return {
          fillColor: getColor(feature.properties.vaccine),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.4,
      };
    }

    //color
    function getColor(d) {
      return d > 20000000 ? '#800026' :
             d > 10000000  ? '#BD0026' :
             d > 8000000  ? '#E31A1C' :
             d > 4000000  ? '#FC4E2A' :
             d > 2000000   ? '#FD8D3C' :
             d > 1000000   ? '#FEB24C' :
             d > 500000   ? '#FED976' :
                        '#FFEDA0';
    }  

    //listeners
    var geojson;

    function highlightFeature(e) {
      var layer = e.target;

      
      layer.setStyle({
          weight: 4,
          color: '#666',
          dashArray: '',
          fillOpacity: .4
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }

      info.update(layer.feature.properties);
    }
    
    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeatureClosure(vaccineData) {

      return function onEachFeature(feature, layer) {
        //get id
        const id = feature.id;
        const index = parseInt(id, 10);
        feature['properties']['vaccine'] = vaccineData[index];
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
      }
      
    }
    

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      function numberWithCommas(x) {
        if(!x){
          return 0;
        }
        else
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    
        this._div.innerHTML = '<h4>US Vaccines Administered</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + numberWithCommas(props.vaccine) + ' People Vaccinated'
            : 'Hover over a state');
    };

    info.addTo(map);

    //legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [100000, 500000, 1000000, 2000000, 4000000, 8000000, 10000000, 20000000],
            gradestext = ['100,000', '500,000', '1,000,000', '2,000,000', '4,000,000', '8,000,000', '10,000,000', '20,000,000'],
            labels = ['vaccines'];

        // loop through our vaccine intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {

          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            gradestext[i] + (gradestext[i + 1] ? '&ndash;' + gradestext[i + 1] + '<br>' : '+');
        }

        

        return div;
    };

    legend.addTo(map);
  }

  render() {
    
    return (
      <div id="leafletmap"></div>   
    );
  }

}

export default MyMap;