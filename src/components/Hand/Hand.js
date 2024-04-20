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

    const [bet, setBet] = useState(0)

    const onSliderChange = (e) => {
        setBet(e.target.value)
    }

    const fold = () => {
        cardServer.fold()
        changeCards()
    }

    const call = () => {
        cardServer.call()
        changeCards()
    }

    const check = () => {
        cardServer.check()
        changeCards()
    }

    const raise = () => {
        cardServer.raise()
        changeCards()
    }

    const allIn = () => {
        cardServer.allIn()
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
            <div className="d-flex justify-content-center align-items-center mb-1">
                <div className="flex-row">
                    <div>
                        <button type="button" className="size-on-hover btn btn-danger mx-1" onClick={fold}>Pas</button>
                        <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={check}>Czekanie</button> 
                        <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={call}>Sprawdzanie</button>
                        <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={raise}>podbicie</button>
                        <button type="button" className="size-on-hover btn btn-danger mx-1" onClick={allIn}>va banque</button>
                    </div>
                    <div className="mt-1">
                        <label htmlFor="betValue" className="form-label mt-2">Zakład: {bet}</label>
                        <input type="range" className="form-range" id="betValue" min={0} max={1000} step={1} defaultValue={0} onChange={onSliderChange}></input>
                    </div>
                </div>
                
            </div>
        )
    }

    return(
        <>
            <div className="d-flex justify-content-center align-items-center mb-2 rotate-0 display-6">
                Postawiona kwota: 1000
            </div>

            {showOptions()}   

            <div className="hand">
                {cards.map((card, index) => {
                    return <Card value={card.value} sign={card.sign} key={card.sign + card.value} id={index} hidden={!player} onClick={onCardClick} selected={card.isSelected}/>
                })}
            </div>
        </>
    )
}