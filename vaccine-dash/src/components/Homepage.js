import RegionSelector from '../features/regionSelector/RegionSelector'
import Vaccines from '../features/vaccines/Vaccines'
import ChorMap from './Map';

function Home() {
    return(
        <div className="Homepage">
            <RegionSelector />
            <Vaccines />
            <ChorMap />
        </div>
    );
}

export default Home;
