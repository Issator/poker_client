import CardServer from "../../servers/CardServer"
import Card from "../Cards/Card"

export default function Hand({player = false}){

    const cardServer = CardServer()

    const cards = [
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard()
    ]

    const onCardClick = (index) => {
        console.log(cards[index])
    }

    return(
        <div className="hand">
            {cards.map((card, index) => {
                    return <Card value={card.value} sign={card.sign} key={card.sign + card.value} id={index} hidden={!player} onClick={onCardClick}/>
            })}
        </div>
    )
}