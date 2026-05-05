function Card({id,name,image,onClick}){
    return(
        <div
            className="card"
            onClick={() => onClick(id)}
        >
            <img src={image} alt={name}/>
            <p>{name}</p>
        </div>
    );
}

export default Card;