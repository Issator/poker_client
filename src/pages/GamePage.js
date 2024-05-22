import { useSearchParams } from "react-router-dom";
import Hand from "../components/Hand/Hand";
import AuthServer from "../servers/AuthServer";
import { useEffect, useState } from "react";
import socket from "../servers/Socket";
import CardServer from "../servers/CardServer";

const dummyCard = (idx) => {return {znak: idx, kolor:"a"}}
export default function GamePage(){

    const [params, setParams] = useSearchParams()
    const [playerCards, setPlayerCards] = useState([])
    const [p2Cards, setP2CFards] = useState([dummyCard(1),dummyCard(2),dummyCard(3),dummyCard(4),dummyCard(5)])
    const room_id = params.get('id')
    const players = params.get('players')
    const playerName = AuthServer().getUserName()

    useEffect(() => {
        socket.on("aktualizacja", response => {
            console.log(response)
            
            if(response.message == "Start gry"){
                setPlayerCards(response.reka)
            }
        })
        
        return(() => {
            socket.off("aktualizacja")
        })
    }, [])

    useEffect(() => {
        CardServer(room_id).getCards(playerName)
    }, [])

    const onCardSelect = (id) => {
        const newCards = [...playerCards]
        newCards[id].selected = (newCards[id].selected == true ? false : true)
        setPlayerCards(newCards)
    }

    return(
        <div className="vh-100 p-5">
            <div className="board h-100 position-relative">
                <div className="top-hand w-100">
                    <Hand cards={p2Cards}/>
                </div>

                <div className="bottom-hand w-100">
                    <Hand player roomId={room_id} playerName={playerName} cards={playerCards} onCardSelect={onCardSelect}/>
                </div>

                {players >= 3 && <div className="left-hand h-100 d-flex align-items-center">
                    <div className="rotation-90">
                        <Hand/>
                    </div>
                </div>}

                {players == 4 && <div className="right-hand h-100 d-flex align-items-center">
                    <div className="rotation-270">
                        <Hand/>
                    </div>
                </div>}
            </div>
        
        </div>
    )
}