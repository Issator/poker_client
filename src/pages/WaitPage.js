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
    const [players, setPlayers] = useState([])
    const [owner, setOwner] = useState("")
    const room_id = params.get('id')
    const [showModal, setShowModal] = useState(false)
    const [roomData, setRoomData] = useState()
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

        // TODO: reload dont kick out
        return() => {
            RoomServer().leaveRoom(room_id, userName).finally(() => {
                redirect("/search")
            })}
    }, [])



    const refreshList = () => {
        RoomServer().getPlayersInRoom(room_id).then(response => {
            setPlayers(response.gracze)
            setOwner(response.Wlasciciel)
        })
    }

    const kickOutUser = (name) => {
        RoomServer().leaveRoom(room_id, name).finally(() => {
            console.log(`kick ${name} user out`)
            refreshList()
        })
    }

    const onFormSubmit = (data) => {
        console.log(data)
        setShowModal(false)
    }

    useEffect(() => {

        refreshList()
        
        const interval = setInterval(() => {
            refreshList()
        }, 1000 * 10)

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        socket.on(`start_game:${room_id}`, (response) => {
            console.log(`gra "${room_id}" zaczęła się!`)
        })

        return(() => {
            socket.off(`start_game:${room_id}`)
        })
    },[])

    const startGame = (userName, roomName) => {
        RoomServer().startGame(userName, roomName)
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
                <h1 className="me-auto">Lobby pokoju {room_id}</h1>
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
                <Link to={"/search"} className="btn btn-danger mt-2">Wyjdz z pokoju</Link>
                {AuthServer().getUserName() == owner && 
                    <button type="button" 
                            className="btn btn-success ms-auto mt-2" 
                            disabled={players.length < 2}
                            onClick={() => startGame(owner, room_id)}
                    >Rozpocznij gre</button>
                }
            </div>

            {showModal && <CreateRoomModal onClose={() => setShowModal(false)} onFormSubmit={onFormSubmit} editMode={true} defaultValues={{roomName: room_id}}/>}
        </div>
    )
}