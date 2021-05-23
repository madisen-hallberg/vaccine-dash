import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from 'axios';
import { Dropdown, Table } from "react-bootstrap";
import ReactDOM from 'react-dom';
import "./dropdown.css"

const region_list = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','DC','Florida',
'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const state_abrev = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND','OH', 'OK', 'OR', 'PA', 
 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

const regions = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District Of Columbia': 'DC',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virgin Islands': 'VI',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
  }


const test_states = [
[{city:"Portland", provider:"Carl's Jr.", count:55},
{city:"Gresham", provider:"Carl's Jr.", count:55},
{city:"Lake Oswego", provider:"Carl's Jr.", count:5},
{city:"Portland", provider:"Carl's Jr.", count:525},
{city:"Portland", provider:"Carl's Jr.", count:55}],

[{city:"Seattle", provider:"Stevie's place", count:95},
{city:"Vancouver", provider:"Stevie's place", count:90},
{city:"Olympia", provider:"Carl's Jr.", count:55},
{city:"Portland", provider:"Carl's Jr.", count:55},
{city:"Portland", provider:"Carl's Jr.", count:0}]

]


export class Dd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region : " Oregon "
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  call_api(){

    const api_string = 'https://www.vaccinespotter.org/api/v0/states/' + regions[(this.state.region).replace(/\s/g, '')] + '.json';

    const table_values = axios.get(api_string).then((res=>{

      res = res["data"]["features"];
      let len = Object.keys(res).length

      console.log(len)

      let r = [];
      for(let k = 0; k < len; ++k){

        let prop = res[k]["properties"];
        let avail = prop["appointments_available"];
        let feat = prop["appointments"];
        let city = prop["city"];
        let location = prop["name"];
        let len = 0;

        if(feat)
          len = Object.keys(feat).length;

        if(avail === true && len > 0){
          r.push(Object.keys(feat).length)
          r.push(city)
          r.push(location + "\n\n")
        }

      
      }
      console.log(r)

    }))
  }

  handleChange({ target }) {
    this.setState({
      [target.region]: target.value

    });
  }

  async handleClick(e) {
    this.setState({region:e.target.text});
    this.populate_table();
    this.call_api();

}

  populate_states(){
    let res = [];

    for(var key in regions)
      res.push(<Dropdown.Item onClick={this.handleClick}> {key} </Dropdown.Item>)

    return res;
  }

  populate_table(){
    let dataset = test_states[1];
    if(this.state.region === ' Oregon ')
      dataset = test_states[0];

    let res = [];
    for(let j = 0; j < 5; ++j){
      res.push(<tr>
        <td>{dataset[j]['city']}</td>
        <td>{dataset[j]['provider']}</td>
        <td>{dataset[j]['count']}</td>
      </tr>)

  }

  return res;

  
  }


  render() {

    return(

<div>
<Dropdown id = "dropdown-size-small">
  <Dropdown.Toggle >
    {this.state.region}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {this.populate_states()}

  </Dropdown.Menu>
</Dropdown>


<Table bordered hover>
  <thead>
    <tr>
      <th>City</th>
      <th>Location</th>
      <th>Avail.</th>
    </tr>
  </thead>

  <tbody>
      {this.populate_table()}
  </tbody>


</Table>


</div>


            
      )
  }
}





export default Dd