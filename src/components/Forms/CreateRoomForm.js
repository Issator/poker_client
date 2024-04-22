import { useState } from "react"

export default function CreateRoomForm({onSubmit}){
    const [roomName, setRoomName] = useState("")
    const [password, setPassword] = useState("")


    const handleButtonSubmit = () => {
        onSubmit({roomName, password})
    }

    return (
        <div className="card p-4 m-4 border-2">
            <h6 className="display-6 text-center">Utwórz nowy pokój</h6>
            <form>
                <div class="form-group">
                    <label htmlFor="roomName">Nazwa pokoju</label>
                    <input type="text" value={roomName} onChange={e => setRoomName(e.target.value)}className="form-control" id="roomName" placeholder="Podaj nazwe pokoju"/>
                </div>
                <div class="form-group">
                    <label htmlFor="roomPassword">Hasło</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="roomPassword" placeholder="Podaj hasło" aria-describedby="passwordNote"/>
                    <small id="passwordNote" className="form-text text-muted">Jeżeli nie podasz hasła, pokój będzie dostępny dla każdego</small>
                </div>
                <div className="d-flex flex-column-reverse mt-4">
                    <button type="button" className="btn btn-primary ms-auto" disabled={!roomName?.trim()} onClick={handleButtonSubmit}>Utwórz</button>
                </div>
            </form>
        </div>
    )
}