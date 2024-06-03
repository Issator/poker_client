import Modal from "./Modal"
import CreateRoomForm from "../Forms/CreateRoomForm"

export default function CreateRoomModal({onClose, onFormSubmit, editMode = false, defaultValues}){
    return (
        <Modal onClose={onClose}>
            <div className="card" style={{width: "32rem"}}>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary mt-2 me-2 rounded-circle" onClick={onClose}>X</button>
                </div>
                <CreateRoomForm onSubmit={onFormSubmit} editMode={editMode} defaultValues={defaultValues}/>
            </div>
        </Modal>
    )
}