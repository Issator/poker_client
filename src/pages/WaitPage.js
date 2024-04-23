import { useEffect, useState } from "react"
import { Link, redirect, useSearchParams } from "react-router-dom"
import RoomServer from "../servers/RoomServer"
import { MdOutlineRefresh } from "react-icons/md"
import { IoPersonSharp } from "react-icons/io5"
import AuthServer from "../servers/AuthServer"

export default function WaitPage(){

    const [params, setParams] = useSearchParams()
    const [players, setPlayers] = useState([])
    const roomName = params.get('name')

    useEffect(() => {
        const userName = AuthServer().getUserName()

        const a = []

        RoomServer().getPlayersInRoom(roomName).then(response => {
            return response.gracze
        }).then(players => {
            console.log(players)
            if(!players.includes(userName)){
            
                RoomServer().joinRoom(userName,roomName, "")
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            })
            }
        })

        // TODO: reload dont kick out
        return() => {
            RoomServer().leaveRoom(roomName, userName).finally(() => {
                redirect("/search")
            })}
    }, [])

    const refreshList = () => {
        RoomServer().getPlayersInRoom(roomName).then(response => {
            setPlayers(response.gracze)
        })
    }

    const peopleInRoom = () => {

        if(players.length == 0){
            return <p className="fw-bold">Brak graczy</p>
        }  

        return players.map((player, index) => {
            return <p className="display-6" key={index}><IoPersonSharp/> {player}</p>
        })
    }

    return (
        <div className="container">
            <h1>Lobby pokoju {roomName}</h1>
            <hr/>
            <p className="display-4">
                lista graczy 
                <button type="button" className="ms-3 btn btn-secondary rounded-pill" onClick={refreshList}>
                    <MdOutlineRefresh className="display-6"/>
                </button>
            
            </p>
            {peopleInRoom()}
            <div className="d-flex flex-row">
                <Link to={"/search"} className="btn btn-danger mt-2">Wyjdz z pokoju</Link>
                <button type="button" className="btn btn-success ms-auto mt-2" disabled={players.length < 2}>Rozpocznij gre</button>
            </div>
        </div>
    )
}