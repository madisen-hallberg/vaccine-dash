import RegionSelector from '../features/regionSelector/RegionSelector'
import AvailableVaccines from '../features/vaccineAvailability/Vaccines';
import '../style/main.css';
import MyMap from './map/Map';

function Home() {
    return(
        <div className="homepage">
            <MyMap />
            <RegionSelector />
            <AvailableVaccines />
        </div>
    );
}

export default Home;
