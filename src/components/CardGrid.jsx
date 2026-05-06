import Card from "./Card";

function CardGrid({gameCards,onCardClick}){
    return(
        <div className="grid">
            {gameCards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    image={card.image}
                    onClick={onCardClick}
                />
            ))}
        </div>
    );
}

export default CardGrid;