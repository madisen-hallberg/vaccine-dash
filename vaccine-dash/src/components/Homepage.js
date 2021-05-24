import RegionSelector from '../features/regionSelector/RegionSelector'
import AvailableVaccines from '../features/vaccineAvailability/Vaccines';

function Home() {
    return(
        <div className="Homepage">
            <RegionSelector />
            <AvailableVaccines />
        </div>
    );
}

export default Home;
