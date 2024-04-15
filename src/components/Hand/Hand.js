import { useState } from "react"
import CardServer from "../../servers/CardServer"
import Card from "../Cards/Card"
import TokenServer from "../../servers/TokenServer"

export default function Hand({player = false}){

    const cardServer = CardServer()
    const tokenServer = TokenServer()

    const [cards, setCards] = useState([
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard(),
        cardServer.getCard()
    ])

    const fold = () => {
        tokenServer.fold()
        changeCards()
    }

    const wait = () => {
        tokenServer.wait()
        changeCards()
    }

    const check = () => {
        tokenServer.check()
        changeCards()
    }

    const raise = () => {
        tokenServer.raise()
        changeCards()
    }

    const allIn = () => {
        tokenServer.allIn()
        changeCards()
    }


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
                <button type="button" className="size-on-hover btn btn-danger mx-1" onClick={fold}>Pas</button>
                <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={check}>Czekanie</button> 
                <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={wait}>Sprawdzanie</button>
                <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={raise}>podbicie</button>
                <button type="button" className="size-on-hover btn btn-danger mx-1" onClick={allIn}>va banque</button>
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