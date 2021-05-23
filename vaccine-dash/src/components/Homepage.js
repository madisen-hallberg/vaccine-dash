import RegionSelector from '../features/regionSelector/RegionSelector'
import AvailableVaccines from '../features/vaccineAvailability/Vaccines';
import Historic from '../features/historicDisplay/HistoricDisplay'

function Home() {
    return(
        <div className="Homepage">
            <RegionSelector />
            <AvailableVaccines />
            <Historic />
        </div>
    );
}

export default Home;
