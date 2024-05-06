import Modal from "./Modal"
import CreateRoomForm from "../Forms/CreateRoomForm"

export default function CreateRoomModal({onClose, onFormSubmit, editMode = false, defaultValues}){
    return (
        <Modal onClose={onClose}>
            <div className="card" style={{width: "32rem"}}>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn-close bg-light p-2 m-2 mb-0 rounded rounded-4" 
                            data-bs-dismiss="modal" 
                            aria-label="Close" 
                            onClick={onClose}></button>
                </div>
                <CreateRoomForm onSubmit={onFormSubmit} editMode={editMode} defaultValues={defaultValues}/>
            </div>
        </Modal>
    )
}