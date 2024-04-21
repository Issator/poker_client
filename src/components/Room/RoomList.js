import { useState } from "react";
import Modal from "../Modal/Modal";
import RoomItem from "./RoomItem";
import CreateRoomForm from "../Forms/CreateRoomForm";

export default function RoomList(){
    const [showModal, setShowModal] = useState(false)


    return (
        <div className="mt-5">
            <RoomItem/>
            <RoomItem/>
            <RoomItem/>
            <RoomItem/>
            <RoomItem/>
            <RoomItem/>
            <RoomItem/>
            <div className="d-flex flex-row-reverse mt-5">
                <button type='button' className="btn btn-success" onClick={() => setShowModal(true)}>Dodaj</button>
            </div>
            {showModal && <Modal onClose={() => setShowModal(false)}>
                <div className="card" style={{width: "32rem"}}>
                        <CreateRoomForm/>
                </div>
            </Modal>}
        </div>
    )
}