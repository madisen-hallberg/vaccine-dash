import RegionSelector from '../features/regionSelector/RegionSelector'
import AvailableVaccines from '../features/vaccineAvailability/Vaccines';
import '../style/main.css';
import MyMap from './map/Map';
import Schedule from './home/scheduleButton';
import Facts from './home/factsButton';

function Home() {
    return(
        <div className="homepage">
            <div className ="column column1">
                <div className = "homeitem">
                    <MyMap />
                </div>
                <div className = "container">
                <Schedule/>
                <Facts/>
                </div>
            </div>
            <div className ="column column2">
                <div className = "homeitem">
                    <RegionSelector />
                    <AvailableVaccines />
                </div>
            </div>
            
        </div>
    );
}

export default Home;
