import { useState } from "react"
import CardServer from "../../servers/CardServer"
import Card from "../Cards/Card"
import { Tooltip } from "../Tooltip/Tooltip"

export default function Hand({player = false, roomId, onCardSelect, playerData, current}){

    const {betAmount, cards, name} = playerData

    const cardServer = CardServer(roomId)
    const [betValue, setBet] = useState(0)

    const onSliderChange = (e) => {
        setBet(e.target.value)
    }

    const fold = () => {
        if(name == current){
            cardServer.fold()
        }
    }

    const call = () => {
        if(name == current){    
            cardServer.call()
        }
    }

    const check = () => {
        if(name == current){ 
            cardServer.check()
        }
    }

    const raise = () => {
        if(name == current){
            cardServer.raise(betValue)
        }
    }

    const bet = () => {
        if(name == current){
            cardServer.bet(betValue) 
        }
    }

    const allIn = () => {
        if(name == current){
            cardServer.allIn()
        }
    }

    const onCardClick = (id) => {
        onCardSelect(id)
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
                        <input type="range" className="form-range" id="betValue" min={0} max={100} step={1} defaultValue={0} onChange={onSliderChange}></input>
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
                    return <Card value={card.znak} sign={card.kolor} key={card.kolor + card.znak} id={index} hidden={!player} onClick={onCardClick} selected={card.selected}/>
                })}
            </div>
        </>
    )
}