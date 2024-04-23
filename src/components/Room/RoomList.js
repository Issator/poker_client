import { useState } from "react";
import Modal from "../Modal/Modal";
import RoomItem from "./RoomItem";
import CreateRoomForm from "../Forms/CreateRoomForm";
import RoomServer from "../../servers/RoomServer"
import AuthServer from "../../servers/AuthServer";

export default function RoomList(){
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
        RoomServer().createRoom(username,data.roomName, data.password)
                    .then((response) => {
                        console.log(response)
                        loadRooms()
                        setShowModal(false)
                    })
    }

    const showRoomList = () => {

        if(rooms.length == 0){
            return <h4 className="display-4 text-center mt-5">Brak pokoi</h4>
        }

        return rooms.map((room, index) => {
            return <RoomItem key={index} data={room}/>
        })
    }

    return (
        <div className="mt-5 mh-100">

            <div className="d-flex flex-row-reverse mt-5">
                <button type='button' className="btn btn-success ms-2" onClick={() => setShowModal(true)}>Dodaj</button>
                <button type="button" className="btn btn-secondary" onClick={loadRooms}>odśwież</button>
            </div>

            <hr/>
            
            <div className="border border-2 p-2 rounded-2">
                <div className="room-list">
                    <div className="m2">
                        {showRoomList()}
                    </div>
                </div>
            </div>

            {showModal && <Modal onClose={() => setShowModal(false)}>
                <div className="card" style={{width: "32rem"}}>
                        <CreateRoomForm onSubmit={onFormSubmit}/>
                </div>
            </Modal>}
        </div>
    )
}