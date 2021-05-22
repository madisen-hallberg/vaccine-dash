import React, { Component } from 'react';

const url  = `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVIDACTNOW_API_KEY}`
class Vaccines extends Component{
    constructor(props){
        super(props);
        this.state ={
            vaccines: []
        }
    }

    componentWillMount(){
        fetch(url)
        .then(res => res.json())
        .then(data => this.setState({vaccines: data}));
    }

    render(){
        const postItems = this.state.vaccines.map(vaccines => (
            <div key={vaccines.id}>
                <h3>{vaccines.state}</h3>
                <p>{vaccines.actuals.vaccinesDistributed}</p>
            </div>
        ));
        return(
            <div>
                <h1>Vaccines Distributed</h1>
                {postItems}
            </div>
        );
    }
}

export default Vaccines;