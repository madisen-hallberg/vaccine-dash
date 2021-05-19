import React, { Component } from 'react';

class Vaccines extends Component{
    constructor(props){
        super(props);
        this.state ={
            vaccines: []
        }
    }

    componentWillMount(){
        fetch('https://api.covidactnow.org/v2/states.json?apiKey=38647fa3b7c14582bc7fc0853e42dd3d')
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