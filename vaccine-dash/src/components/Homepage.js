import RegionSelector from '../features/regionSelector/RegionSelector'
import AvailableVaccines from '../features/vaccineAvailability/Vaccines';
import '../style/main.css';
import MyMap from './map/Map';

function Home() {
    return(
        <div className="homepage">
            <div className = "homeitem">
                <MyMap />
            </div>
            <div className = "homeitem">
                <RegionSelector />
                <AvailableVaccines />
            </div>
        </div>
    );
}

export default Home;
