import RegionSelector from '../features/regionSelector/RegionSelector'
import AvailableVaccines from '../features/vaccineAvailability/Vaccines';
import HistoricDisplay from '../features/historicDisplay/HistoricDisplay'

function Home() {
    return(
        <div className="Homepage">
            <RegionSelector />
            <AvailableVaccines />
            <HistoricDisplay />
        </div>
    );
}

export default Home;
