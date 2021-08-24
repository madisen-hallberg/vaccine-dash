
import Teammates from './Teammates';
function About() {

    return(
        <div className='aboutus'>
            <h1>About Us</h1>
            <Teammates />
            <br/>
            <h1>Sources</h1>
            <ul>
                <li>
                    <a className = 'sourcelink' href = "https://covidactnow.org/data-api">Covid Act Now</a>
                </li><li>
                    <a className = 'sourcelink' href = "https://www.vaccinespotter.org/api/">Vaccine Spotter</a>
                </li>
            </ul>
        </div>
    );
}

export default About;
