import { useSearchParams } from "react-router-dom";
import Hand from "../components/Hand/Hand";
import AuthServer from "../servers/AuthServer";
import { useEffect, useState } from "react";
import socket from "../servers/Socket";
import CardServer from "../servers/CardServer";

const dC = (idx) => {return {znak: idx, kolor:"a"}}
export default function GamePage(){

    const [params, setParams] = useSearchParams()
    const [playerCards, setPlayerCards] = useState([])
    const [p2, setP2] = useState({cards:[dC(1),dC(2),dC(3),dC(4),dC(5)], name:"", betAmount: 0})
    const [p3, setP3] = useState({cards:[dC(1),dC(2),dC(3),dC(4),dC(5)], name:"", betAmount: 0})
    const [p4, setP4] = useState({cards:[dC(1),dC(2),dC(3),dC(4),dC(5)], name:"", betAmount: 0})
    const room_id = params.get('id')
    const players = params.get('players')
    const playerName = AuthServer().getUserName()
    const [playerBet, setPlayerBet] = useState(0)

    const [currentPlayer, setCurrentPlayer] = useState()

    const getPlayer = (name) => {
        if(p2.name == name){
            return p2
        }

        if(p3.name == name){
            return p3
        }

        if(p4.name == name){
            return p4
        }
    }

    const getSetPlayer = (name) => {
        if(p2.name == name){
            return setP2
        }

        if(p3.name == name){
            return setP3
        }

        if(p4.name == name){
            return setP4
        }

        return null
    }

    const setPlayersNames = (names) => {
        const thisPlayer = AuthServer().getUserName()
        const playerArray = [...names]
        const index = playerArray.indexOf(thisPlayer);
        if (index > -1) {
            playerArray.splice(index, 1);
        }

        if(playerArray.length >= 1){
            setP2(prevState => ({
                ...prevState,
                name: playerArray[0]
            }))
        }

        if(playerArray.length >= 2){
            setP3(prevState => ({
                ...prevState,
                name: playerArray[1]
            }))
        }

        if(playerArray.length == 3){
            setP3(prevState => ({
                ...prevState,
                name: playerArray[2]
            }))
        }

    }

    useEffect(() => {
        socket.on("aktualizacja", response => {
            console.log(response)
            
            if(response.message == "Start gry"){
                setPlayerCards(response.reka)

                const players = response.gracze
                setPlayersNames(players)

            }

            if(response.message == "Gracz postawił stawkę"){
                const currentSetPlayer = getSetPlayer(currentPlayer)
                if(currentSetPlayer){
                    currentSetPlayer(prevState => ({...prevState, betAmount: response.stawka}))
                }else{
                    setPlayerBet(response.stawka)
                }
            }

            if(response.nastepny_gracz){
                setCurrentPlayer(response.nastepny_gracz)
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
                    <Hand cards={p2.cards} playerName={p2.name} betAmount={p2.betAmount}/>
                </div>

                <div className="bottom-hand w-100">
                    <h1 className="text-center display-4">Ruch gracza: {currentPlayer}</h1>
                    <Hand player roomId={room_id} playerName={playerName} cards={playerCards} onCardSelect={onCardSelect} betAmount={playerBet}/>
                </div>

                {players >= 3 && <div className="left-hand h-100 d-flex align-items-center">
                    <div className="rotation-90">
                        <Hand cards={p3.cards} playerName={p3.name} betAmount={p3.betAmount}/>
                    </div>
                </div>}

                {players == 4 && <div className="right-hand h-100 d-flex align-items-center">
                    <div className="rotation-270">
                        <Hand cards={p4.cards} playerName={p4.name} betAmount={p4.betAmount}/>
                    </div>
                </div>}
            </div>
        
        </div>
    )
}