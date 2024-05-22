import { useEffect, useState } from "react"
import CardServer from "../../servers/CardServer"
import Card from "../Cards/Card"
import { Tooltip } from "../Tooltip/Tooltip"

export default function Hand({player = false, playerName, roomId, cards}){

    console.log(cards)

    const cardServer = CardServer(roomId)
    const [bet, setBet] = useState(0)

    const onSliderChange = (e) => {
        setBet(e.target.value)
    }

    const fold = () => {
        cardServer.fold()
    }

    const call = () => {
        cardServer.call()
    }

    const check = () => {
        cardServer.check()
    }

    const raise = () => {
        cardServer.raise()
    }

    const allIn = () => {
        cardServer.allIn()
    }

    const onCardClick = () => {

    }

    const showOptions =  () => {
        if(!player){
            return
        }

        return(
            <div className="d-flex justify-content-center align-items-center mb-1">
                <div className="flex-row">
                    <div>
                        <Tooltip text={"poddaj zakład"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-danger mx-1" onClick={fold}>Pas</button>
                        </Tooltip>
                        <Tooltip text={"czekaj na ruch innych graczy"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={check}>Czekanie</button> 
                        </Tooltip>
                        <Tooltip text={"wyrównaj do postawionej kwoty"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={call}>Sprawdzanie</button>
                        </Tooltip>
                        <Tooltip text={"przebij postawioną stawke"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-primary mx-1" onClick={raise}>podbicie</button>
                        </Tooltip>
                        <Tooltip text={"połóż wszystkie żetony na puli"} position={"bottom"}>
                            <button type="button" className="size-on-hover btn btn-danger mx-1" onClick={allIn}>va banque</button>
                        </Tooltip>
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
                {cards && cards.map((card, index) => {
                    return <Card value={card.znak} sign={card.kolor} key={card.kolor + card.znak} id={index} hidden={!player} onClick={onCardClick} selected={card.isSelected}/>
                })}
            </div>
        </>
    )
}