import { useState } from "react"

export default function CreateRoomForm({onSubmit,editMode = false, defaultValues}){
    const [roomName, setRoomName] = useState(defaultValues?.roomName || "")
    const [password, setPassword] = useState("")


    const handleButtonSubmit = () => {
        onSubmit({roomName, password})
    }

    return (
        <div className="card p-4 m-4 border-2">
            <h6 className="display-6 text-center">{!editMode? "Utwórz nowy pokój" : "Edytuj pokój"}</h6>
            <form>
                <div className="form-group">
                    <label htmlFor="roomName">Nazwa pokoju</label>
                    <input type="text" value={roomName} onChange={e => setRoomName(e.target.value)}className="form-control" id="roomName" placeholder="Podaj nazwe pokoju"/>
                </div>
                <div className="form-group">
                    <label htmlFor="roomPassword">Hasło</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="roomPassword" placeholder="Podaj hasło" aria-describedby="passwordNote"/>
                    <small id="passwordNote" className="form-text text-muted">Jeżeli nie podasz hasła, pokój będzie dostępny dla każdego</small>
                </div>
                <div className="d-flex flex-column-reverse mt-4">
                    <button type="button" className="btn btn-primary ms-auto" disabled={!roomName?.trim()} onClick={handleButtonSubmit}>{editMode? "Zmień" : "Utwórz"}</button>
                </div>
            </form>
        </div>
    )
}