import { useEffect, useState } from "react";
import MainLogo from "../components/MainLogo";
import RoomList from "../components/Room/RoomList";
import RoomServer from "../servers/RoomServer"
import AuthServer from "../servers/AuthServer"
import CreateRoomModal from "../components/Modal/CreateRoomModal";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { MdKey, MdOutlineTimer } from "react-icons/md";
import { Tooltip } from "../components/Tooltip/Tooltip";

export default function RoomPage(){
    const [showModal, setShowModal] = useState(false)
    const [rooms, setRooms] = useState([])
    const [key, setKey] = useState("")
    const [quickJoined, setQuickJoined] = useState(true)
    const navigate = useNavigate()

    const loadRooms = () => {
        RoomServer().getRooms()
                    .then(response => {
                        setRooms(response.pokoje)
                    })
                    .catch(error => {
                        console.log(error)
                    })
    }

    const onFormSubmit = (data) => {
        const username = AuthServer().getUserName()
        RoomServer().createRoom(username,data.roomName, data.password)
                    .then((response) => {
                        console.log(response)
                        setShowModal(false)
                        navigate(`/room?id=${response["ID"]}`, {replace: true})
                    })
    }

    useEffect(() => {

        loadRooms()
        
        const interval = setInterval(() => {
            loadRooms()
        }, 1000 * 10)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const onKeyAccess = () => {
        navigate(`/room?id=${key}`, {replace: true})
    }

    const quickRoom = () => {
        const username = AuthServer().getUserName()
        RoomServer().joinRandomRoom(username)
                    .then(response => {
                        if(response.id != undefined){
                            navigate(`/room?id=${response.id}`, {replace: true})
                        }
                    })
                    .catch(() => {
                        console.log("nie udało się połączyć")
                        failedToJoin()
                    })
        
    }

    const failedToJoin = () => {
        setQuickJoined(false)
        const interval = setInterval(() => {
            clearInterval(interval)
            setQuickJoined(true)
        }, 1000 * 1)
    }

    return (
        <div className="container">
            <MainLogo/>
            <div className="d-flex mt-5">
                <h5 className="display-5 text-center mt-4 me-auto">Wybierz pokój</h5>
                <div className=" align-self-end w-50" >
                    <div className="input-group">
                        <input type="password" className="form-control" placeholder="dołącz do pokoju podając id..." value={key} onChange={e => {setKey(e.target.value)}}/>
                        <button type='button' className="btn btn-primary me-2 rounded-end-1" onClick={onKeyAccess} disabled={key.trim().length == 0}><MdKey className="display-6"/></button>
                        <Tooltip text={"utwórz nowy pokój"} position={"top"}>
                            <button type='button' className="btn btn-success me-2 rounded-1" onClick={() => setShowModal(true)}><FaPlus className="display-6"/></button>
                        </Tooltip>
                        <Tooltip text={"odśwież liste"} position={"top"}>
                            <button type="button" className="btn btn-secondary rounded-1 me-2" onClick={loadRooms}><IoMdRefresh className="display-6"/></button>
                        </Tooltip>
                        <Tooltip text={"dołącz do losowego pokoju"} position={"top"}>
                            <button type="button" className={`btn btn-${quickJoined ? "info" : "danger"} rounded-1`} onClick={quickRoom}><MdOutlineTimer className="display-6"/></button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <RoomList rooms={rooms}/>
            
            {showModal && <CreateRoomModal onClose={() => setShowModal(false)} onFormSubmit={onFormSubmit}/>}
        </div>
    )
}