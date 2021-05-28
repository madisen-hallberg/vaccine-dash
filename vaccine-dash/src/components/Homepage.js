import RegionSelector from '../features/regionSelector/RegionSelector'
import AvailableVaccines from '../features/vaccineAvailability/Vaccines';
import MyMap from './map/Map';

function Home() {
    return(
        <div className="Homepage">
            <RegionSelector />
            <AvailableVaccines />
            <MyMap />
        </div>
    );
}

export default Home;
