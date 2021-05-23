import React, { useEffect, useState } from 'react';


function Vaccines({ data }) {
    const postItems = data.map(item => (
        <div key={item.id}>
            <h3>{item.state}</h3>
            <p>{item.actuals.vaccinesDistributed}</p>
        </div>
    ));

    return(
        <div>
            <h1>Vaccines Distributed</h1>
            {postItems}
        </div>
    );
}

export default Vaccines;