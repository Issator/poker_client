import { useEffect, useState } from "react"
import CardServer from "../../servers/CardServer"
import Card from "../Cards/Card"
import { Tooltip } from "../Tooltip/Tooltip"
import socket from "../../servers/Socket"

export default function Hand({player = false, roomId, onCardSelect, playerData, current, selected, onChangeCards}){

    const {betAmount, cards, name, rest} = playerData
    const [canTakeCards, setCanTakeCards] = useState(false)

    const cardServer = CardServer(roomId)
    const [betValue, setBet] = useState(0)

    useEffect(() => {
        if(player){
            socket.on('dobierz_karty', response => {
                console.log(response)
                setCanTakeCards(true)
            })
        }

        return(() => {
            if(player){
                socket.off('dobierz_karty')
            }
        })
    },[])

    const resetBet = () => {
        setBet(0)
    }

    const onSliderChange = (e) => {
        setBet(e.target.value)
    }

    const fold = () => {
        if(name == current){
            cardServer.fold()
            resetBet()
        }
    }

    const call = () => {
        if(name == current){    
            cardServer.call()
            resetBet()
        }
    }

    const check = () => {
        if(name == current){ 
            cardServer.check()
            resetBet()
        }
    }

    const raise = () => {
        if(name == current){
            cardServer.raise(betValue)
            resetBet()
        }
    }

    const bet = () => {
        if(name == current){
            cardServer.bet(betValue) 
            resetBet()
        }
    }

    const allIn = () => {
        if(name == current){
            cardServer.allIn()
            resetBet()
        }
    }

    const onCardClick = (id) => {
        onCardSelect(id)
    }

    const changeCards = () => {
        onChangeCards()
        setCanTakeCards(false)
    }

    const showOptions =  () => {
        if(!player){
            return
        }

        const canChangeCards = selected.some((item) => item == true)
        const changeCardsColor = canChangeCards ? "warning" : "secondary"

        return(
            <div className="d-flex justify-content-center align-items-center mb-1">
                <div className="flex-row">
                    <div>
                        <Tooltip text={"poddaj zakład"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-danger mx-1" onClick={fold}>Pas</button>
                        </Tooltip>
                        {canTakeCards && <Tooltip text={"zmień wybrane karty"} position={"bottom"}>
                            <button type="button" className={`size-on-hover btn btn-${changeCardsColor} mx-1`} onClick={changeCards} disabled={!canChangeCards}>Zmień karty</button>
                        </Tooltip>}
                        <Tooltip text={"czekaj na ruch innych graczy"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={check}>Czekanie</button> 
                        </Tooltip>
                        <Tooltip text={"wyrównaj do postawionej kwoty"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={call}>Sprawdzanie</button>
                        </Tooltip>
                        <Tooltip text={"postaw swoją stawke"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-success mx-1" onClick={bet}>postaw</button>
                        </Tooltip>
                        <Tooltip text={"przebij postawioną stawke"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={raise}>podbicie</button>
                        </Tooltip>
                        <Tooltip text={"połóż wszystkie żetony na puli"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-danger mx-1" onClick={allIn}>va banque</button>
                        </Tooltip>
                    </div>
                    <div className="mt-1">
                        <label htmlFor="betValue" className="form-label mt-2">Zakład: {betValue}</label>
                        <input type="range" className="form-range" id="betValue" min={0} max={rest > 0 ? rest : 0} step={1} onChange={onSliderChange} value={betValue}></input>
                    </div>
                </div>
                
            </div>
        )
    }

    return(
        <>
            <div className="d-flex justify-content-center align-items-center mb-2 rotate-0 display-6">
                {name}: Postawiona kwota: {betAmount || 0}
            </div>

            {showOptions()}

            <div className="hand">
                {cards && cards.map((card, index) => {
                    return <Card value={card.znak} sign={card.kolor} key={card.kolor + card.znak} id={index} hidden={!player} onClick={onCardClick} selected={selected ? selected[index] : false}/>
                })}
            </div>
        </>
    )
}