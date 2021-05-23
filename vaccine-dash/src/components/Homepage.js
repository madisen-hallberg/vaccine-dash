import RegionSelector from '../features/regionSelector/RegionSelector'
import Vaccines from '../features/vaccines/Vaccines';
import Historic from '../features/historicDisplay/HistoricDisplay'

function Home() {
    return(
        <div className="Homepage">
            <RegionSelector />
            <Vaccines />
            <Historic />
        </div>
    );
}

export default Home;
