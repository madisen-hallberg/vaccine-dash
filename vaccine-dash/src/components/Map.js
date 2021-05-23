import Choropleth from 'react-leaflet-choropleth'
import { Map } from 'react-leaflet'

import { useSelector } from 'react-redux'
import { allVaccineData } from '../features/vaccines/vaccineSlice'


    const style = {
      fillColor: '#F28F3B',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.5
  }


  const ChorMap = () => {

    const vaccineData = useSelector(allVaccineData);
    
    console.log(vaccineData);

    //clean up vaccine data.
    //omit any us territories outside of map
    let vaccineDataFiltered = vaccineData.filter(function(region){
      return region.state !== "MP";
    })

    vaccineDataFiltered = vaccineDataFiltered.filter(function(region){
      return region.state !== "PR";
    })

    console.log(vaccineDataFiltered);


    return(<Map>
      <Choropleth
        data={{type: 'FeatureCollection', features: vaccineData}}
        valueProperty={(feature) => feature.state}
        visible={(feature) => feature.state}
        scale={['#b3cde0', '#011f4b']}
        steps={7}
        mode='e'
        style={style}
        onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.label)}
        ref={(el) => this.choropleth = el.leafletElement}
      />
    </Map>)
  }

  export default ChorMap

  
  