import React, { Component } from 'react';

class Posts extends Component{
    constructor(props){
        super(props);
        this.state ={
            posts: []
        }
    }

    componentWillMount(){
        fetch('https://api.covidactnow.org/v2/states.json?apiKey=38647fa3b7c14582bc7fc0853e42dd3d')
        .then(res => res.json())
        .then(data => this.setState({posts: data}));
    }

    render(){
        const postItems = this.state.posts.map(post => (
            <div key={post.id}>
                <h3>{post.state}</h3>
                <p>{post.actuals.vaccinesDistributed}</p>
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

export default Posts;