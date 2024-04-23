import { useState } from "react";
import MainLogo from "../components/MainLogo";
import RoomList from "../components/Room/RoomList";
import RoomServer from "../servers/RoomServer"
import AuthServer from "../servers/AuthServer"
import CreateRoomModal from "../components/Modal/CreateRoomModal";
import { redirect } from "react-router-dom";

export default function RoomPage(){
    const [showModal, setShowModal] = useState(false)
    const [rooms, setRooms] = useState([])

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
        return RoomServer().createRoom(username,data.roomName, data.password)
                    .then((response) => {
                        console.log(response)
                        setShowModal(false)
                        return redirect(`/room?name=${data.roomName}&created=true`)
                    })
    }

    return (
        <div className="container">
            <MainLogo/>
            <div className="d-flex mt-5">
                <h5 className="display-5 text-center mt-4 me-auto">Wybierz pokój</h5>
                <div className=" align-self-end">
                    <button type='button' className="btn btn-success me-2" onClick={() => setShowModal(true)}>Dodaj</button>
                    <button type="button" className="btn btn-secondary" onClick={loadRooms}>odśwież</button>
                </div>
            </div>

            <RoomList rooms={rooms}/>
            
            {showModal && <CreateRoomModal onClose={() => setShowModal(false)} onFormSubmit={onFormSubmit}/>}
        </div>
    )
}