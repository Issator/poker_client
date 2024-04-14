import { useState } from "react"
import CardServer from "../../servers/CardServer"
import Card from "../Cards/Card"

export default function Hand({player = false}){

    const cardServer = CardServer()

    const [cards, setCards] = useState([
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard()
    ])

    const onCardClick = (index) => {
        const newCards = [...cards]
        newCards[index].isSelected = !newCards[index].isSelected
        setCards(newCards)
    }

    const changeCards = () => {
        const newCards = [...cards]

        for(let i=0; i<newCards.length; i++){
            if(newCards[i].isSelected){
                newCards[i] = cardServer.changeCard()
            }
        }

        console.log(newCards)
        setCards(newCards)
    }

    const showOptions =  () => {
        if(!player){
            return
        }

        return(
            <div className="d-flex justify-content-center align-items-center mb-5">
                <button type="button" className="btn btn-primary mx-1" onClick={changeCards}>Pas</button>
                <button type="button" className="btn btn-primary mx-1" onClick={changeCards}>Czekanie</button>
                <button type="button" className="btn btn-primary mx-1" onClick={changeCards}>Sprawdzanie</button>
                <button type="button" className="btn btn-primary mx-1" onClick={changeCards}>podbicie</button>
                <button type="button" className="btn btn-primary mx-1" onClick={changeCards}>va banque</button>
            </div>
        )
    }

    return(
        <>
         {showOptions()}   
        <div className="hand">
            {cards.map((card, index) => {
                    return <Card value={card.value} sign={card.sign} key={card.sign + card.value} id={index} hidden={!player} onClick={onCardClick} selected={card.isSelected}/>
            })}
        </div>
        </>
    )
}