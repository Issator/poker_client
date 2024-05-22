import { useEffect, useState } from "react"
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom"
import RoomServer from "../servers/RoomServer"
import { MdEdit, MdOutlineRefresh } from "react-icons/md"
import { IoPersonSharp } from "react-icons/io5"
import AuthServer from "../servers/AuthServer"
import { FaCrown, FaTrash } from "react-icons/fa"
import CreateRoomModal from "../components/Modal/CreateRoomModal"
import socket from "../servers/Socket"

export default function WaitPage(){

    const [params, setParams] = useSearchParams()
    const [players, setPlayers] = useState([]) // TODO: jest w roomData już
    const [owner, setOwner] = useState("") // TODO: jest w roomData juz
    const room_id = params.get('id')
    const [showModal, setShowModal] = useState(false)
    const [roomData, setRoomData] = useState("asdasasdasd")
    const navigate = useNavigate()

    useEffect(() => {
        const userName = AuthServer().getUserName()

        RoomServer().getPlayersInRoom(room_id).then(response => {
            return response.gracze
        }).then(players => {

            if(players.length >= 4){
                navigate('/search')
            }

            if(!players.includes(userName)){
            
                RoomServer().joinRoom(userName,room_id, "")
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            })
            }

            refreshList()
        })
    }, [])



    const refreshList = () => {
        RoomServer().getPlayersInRoom(room_id).then(response => {
            setPlayers(response.gracze)
            setOwner(response.Wlasciciel)
            setRoomData(response)
        })
    }

    const kickOutUser = (name) => {
        RoomServer().leaveRoom(room_id, name).finally(() => {
            console.log(`kick ${name} user out`)
            refreshList()
        })
    }

    const onFormSubmit = (data) => {
        const username = AuthServer().getUserName();
        RoomServer().changeRoomData(username,room_id,data.roomName,data.password)
                    .then(response => {
                        console.log(response)
                        refreshList()
                        setShowModal(false)
                    })
                    .catch(error => {
                        console.log("edycja nie powiodła sie")
                    })
    }

    useEffect(() => {

        refreshList()
        
        socket.on('dolacz_do_pokoju', (response) => {
            refreshList()
        })
        
        return () => {
            socket.off('dolacz_do_pokoju')
        }
    }, [])

    useEffect(() => {
        socket.on('opuszczanie_pokoju', (response) => {
            refreshList()
        })

        return () => {
            socket.off('opuszczanie_pokoju')
        }
    }, [])

    useEffect(() => {
        socket.on(`start_game`, () => {
            navigate(`/game?id=${room_id}&players=${players.length}`, { replace: true })
        })
    },[socket, players])

    const startGame = () => {
        RoomServer().startGame(roomData.gracze, room_id)
    }

    const leaveRoom = () => {
        const username = AuthServer().getUserName()
        RoomServer().leaveRoom(room_id, username)
        socket.off(`start_game`)
        navigate("/search", { replace: true })
    }

    const peopleInRoom = () => {

        if(players.length == 0){
            return <p className="fw-bold">Brak graczy</p>
        }  

        return players.map((player, index) => {
            return (
                <div className="d-flex flex-row align-items-center"  key={index}>
                    {player == owner ? <FaCrown className="display-6"/> : <IoPersonSharp className="display-6"/>}
                    <p className="display-6 mx-2 me-auto">{player}</p>
                    {AuthServer().getUserName() == owner && player != owner &&
                        <button type="button" className="btn btn-danger" onClick={() => kickOutUser(player)}><FaTrash/></button>
                    }
                </div>
            )
        })
    }

    return (
        <div className="container">
            <div className="d-flex flex-row mt-2">
                <h1 className="me-auto">Lobby pokoju {roomData?.nazwa}</h1>
                {AuthServer().getUserName() == owner && <button type="button" className="btn btn-primary mt-3" onClick={() => setShowModal(true)}><MdEdit/></button>}
            </div>
            <hr/>
            <p className="display-4">
                lista graczy 
                <button type="button" className="ms-3 btn btn-secondary rounded-pill" onClick={refreshList}>
                    <MdOutlineRefresh className="display-6"/>
                </button>
            
            </p>
            {peopleInRoom()}
            <hr/>

            <div className="d-flex flex-row">
                <button onClick={leaveRoom} className="btn btn-danger mt-2">Wyjdz z pokoju</button>
                {AuthServer().getUserName() == owner && 
                    <button type="button" 
                            className="btn btn-success ms-auto mt-2" 
                            
                            onClick={startGame}
                    >Rozpocznij gre</button>
                }
            </div>

            {showModal && <CreateRoomModal onClose={() => setShowModal(false)} onFormSubmit={onFormSubmit} editMode={true} defaultValues={{roomName: roomData?.nazwa}}/>}
        </div>
    )
}