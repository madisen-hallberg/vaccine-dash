import RegionSelector from '../features/regionSelector/RegionSelector'
import AvailableVaccines from '../features/vaccineAvailability/Vaccines'
import HistoricDisplay from '../features/historicDisplay/HistoricDisplay'
import MyMap from './Map/Map';

function Home() {
    return(
        <div className="Homepage">
            <RegionSelector />
            <AvailableVaccines />
            <HistoricDisplay />
            <MyMap />
        </div>
    );
}

export default Home;
