import RegionSelector from '../features/regionSelector/RegionSelector';
import AvailableVaccines from '../features/vaccineAvailability/Vaccines';
import MobileAvailableVaccines from '../features/vaccineAvailability/mobileVac';
import HistoricDisplay from '../features/historicDisplay/HistoricDisplay';
import '../style/main.css';

import MyMap from './Map/Map';

import Schedule from './home/scheduleButton';
import Facts from './home/factsButton';


import { useMediaQuery } from 'react-responsive'

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 414 })
  return isMobile ? children : null
}
const Desktop = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 415 })
  return isNotMobile ? children : null
}

function Home() {


    return(

        <div className="homepage">

        <Desktop>
        <div className ="column column1">
                <div className = "homeitem">
                    <RegionSelector />
                    <MyMap />
                </div>
                <div className = "container">
                <Schedule/>
                <Facts/>
                </div>
            </div>
            <div className ="column column2">
                <div className = "homeitem">
                    <AvailableVaccines />
                </div>
                <div className = "homeitem">
                    <HistoricDisplay />
                </div>
            </div>        
        </Desktop>


        <Mobile>
        <div className ="column column1">
        <div className = "homeitem">
                </div>
                <div className = "container">
                    <Schedule/>
                    <Facts/>
                </div>
                <RegionSelector />


                <div className = "homeitem">
                    <MobileAvailableVaccines />
                </div>


            </div>

        </Mobile>



            





        </div>
    );
}

export default Home;
