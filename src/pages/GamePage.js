import { useNavigate, useSearchParams } from "react-router-dom";
import Hand from "../components/Hand/Hand";
import AuthServer from "../servers/AuthServer";
import { useEffect, useState } from "react";
import socket from "../servers/Socket";
import CardServer from "../servers/CardServer";
import Modal from 'react-modal';

const dummyCard = (idx) => {return {znak: idx, kolor:"a"}}

const dummyCards = (amount = 5) => {

    const cards = []
    for(let i=0;i<amount;i++){
        const random = Math.floor(Math.random() * 1000)
        cards.push(dummyCard(random))
    }

    return cards
}

export default function GamePage(){

    const DEFAULT = [{
            name: AuthServer().getUserName(),
            cards: dummyCards(),
            betAmount: 0,
            rest: 100
        },
        {
            name: "",
            cards: dummyCards(),
            betAmount: 0,
            rest: 100
        },
        {
            name: "",
            cards: dummyCards(),
            betAmount: 0,
            rest: 100
        },
        {
            name: "",
            cards: dummyCards(),
            betAmount: 0,
            rest: 100
        }]

    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()
    const [players, setPlayers] = useState([...DEFAULT])
    const room_id = params.get('id')
    const numOfPlayers = params.get('players')
    const mainPlayer = AuthServer().getUserName();
    const [selected, setSelected] = useState([false,false,false,false,false]);

    const [endRoundsModal, setEndRoundModal] = useState(false)
    const [gameOverModal, setGameOverModal] = useState(false) 
    const [winner, setWinner] = useState("")
    const [winningHand, setWinningHand] = useState("")
    const [bilans_gracza, setWygranyBilans] = useState("")

    const [onTable, setOnTable] = useState(0)

    const [currentPlayer, setCurrentPlayer] = useState("")

    const setPlayerData = (name,json) => {
        console.log(name,json)
        const playerId = players.findIndex(player => player.name == name)
        const newData = [...players]
        if(playerId != -1){
            newData[playerId] = {
                ...newData[playerId],
                ...json
            }
            
            setPlayers(newData)
        }

    }

    const firstCall = (names, cards) => {
        const newData = [...players]
        let i = 1;
        names.forEach(name => {
            if(name != mainPlayer){
                newData[i].name = name
                i+=1
            }
        })

        newData[0].cards = cards
        setPlayers(newData)
    }

    const setPlayerNames = (names) => {
        const newData = [...players]
        names.forEach((name, id) => {
            if(name != mainPlayer){
                newData[id + 1].name = name
            }
        })

        setPlayers(newData)
    }

    useEffect(() => {
        socket.on("aktualizacja", response => {
            console.log("Aktualizacja",response)
            
            if(response.message == "Start gry"){
                firstCall(response.gracze,response.reka)
            }else{
                if(response.obecny_gracz && response.stawka){
                    setPlayerData(response.obecny_gracz, {betAmount: response.stawka, rest: response.bilans})
                }
            }

            if(response.message == "Karty"){
                setPlayerData(mainPlayer, {cards: response.karty})
            }

            if(response.stawka_total){
                setOnTable(response.stawka_total)
            }

            setCurrentPlayer(response.nastepny_gracz)
        })

        socket.on("rezultat", response => {
            console.log(response)
            setWinner(response.zwyciezca)
            setWinningHand(response.uklad_zwyciezcy)
            setWygranyBilans(response.bilans_gracza)
            setEndRoundModal(true)
        })
        socket.on("rezultatkoniecgry", response => {
            console.log(response)
            setEndRoundModal(false)
            setGameOverModal(true)
        })
        
        return(() => {
            socket.off("aktualizacja")
            socket.off("rezultat")
            socket.off("rezultatkoniecgry")
        })
    }, [])

    useEffect(() => {
        CardServer(room_id).getCards(mainPlayer)
    }, [])

    const onCardSelect = (id) => {
        const prevState = [...selected]
        prevState[id] = !prevState[id]
        setSelected(prevState)
    }

    const closeModal = () => {
        setEndRoundModal(false)
    }

    const continueGame = () => {
        closeModal()
    }

    const endGame = () => {
        closeModal()
        navigate("/search", { replace: true })
    }

    const playAgain = () => {
        closeModal()
    }

    const backToLobby = () => {
        closeModal()
        navigate(`/room?id=${room_id}`, {replace: true})
    }

    const onChangeCards = () => {
        const toChange = []
        players[0].cards.forEach((card, id) => {
            if(selected[id]){
                toChange.push({
                    hierarchia: card.znak,
                    kolory: card.kolor
                })
            }
        })

        setSelected([false,false,false,false,false])
        CardServer(room_id).changeCards(toChange, mainPlayer)
    }

    return(
        <div className="vh-100 p-5">
            <div className="board h-100 position-relative">
                <div className="top-hand w-100">
                    <Hand  playerData={players[1]}/>
                </div>

                <div className="bottom-hand w-100">
                    <div>
                        <h6 className="text-center display-6">Na stole: {onTable}</h6>
                        <h6 className="text-center display-6 me-2">Ruch gracza: {currentPlayer}</h6>
                    </div>
                    <Hand player roomId={room_id} onCardSelect={onCardSelect} playerData={players[0]} current={currentPlayer} selected={selected} onChangeCards={onChangeCards}/>
                </div>

                {numOfPlayers >= 3 && <div className="left-hand h-100 d-flex align-items-center">
                    <div className="rotation-90">
                        <Hand playerData={players[2]}/>
                    </div>
                </div>}

                {numOfPlayers == 4 && <div className="right-hand h-100 d-flex align-items-center">
                    <div className="rotation-270">
                        <Hand playerData={players[3]}/>
                    </div>
                </div>}
            </div>

            <Modal
                isOpen={endRoundsModal}
                onRequestClose={closeModal}
                contentLabel="Round Result"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-content">
                    <h2 className="modal-title">KONIEC RUNDY</h2>
                    <p className="modal-text">Rundę wygrał {winner}</p>
                    <p className="modal-text">Układ zwycięzcy: {winningHand}</p>
                    <div className="modal-buttons">
                        <button onClick={continueGame} className="modal-button">Kontynuuj</button>
                        <button onClick={endGame} className="modal-button">Przerwij grę</button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={gameOverModal}
                contentLabel="Game Result"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-content">
                    <h2 className="modal-title">KONIEC GRY</h2>
                    <p className="modal-text">Grę wygrał {winner}</p>
                    <p className="modal-text">Bilans zwycięzcy: {bilans_gracza}</p>
                    <div className="modal-buttons">
                        <button onClick={playAgain} className="modal-button">Zagraj Ponownie</button>
                        <button onClick={backToLobby} className="modal-button">Wróć do poczekalni</button>
                    </div>
                </div>
            </Modal>
        
        </div>
    )
}