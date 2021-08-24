const Teammate = ( { teammate }) => {

    return(
        <div className = 'column'>
            <div className ='teammate card'>
                <img className='teammateimg' src={teammate.img} alt=""/>
                <h2 className ='teammatename'>{teammate.name}</h2>
                <p>{teammate.bio}</p>
            </div>
        </div>
    );
}

export default Teammate;
