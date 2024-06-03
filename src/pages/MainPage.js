import { Link, useNavigate } from "react-router-dom";
import AnonymousForm from "../components/Forms/AnonymousForm";
import AuthServer from "../servers/AuthServer";
import MainLogo from "../components/MainLogo";
import { useState } from "react";
import RoomServer from "../servers/RoomServer";

export default function MainPage(){
    const [name, setName] = useState(AuthServer().getUserName())
    const [quickJoined, setQuickJoined] = useState(true)
    const navigate = useNavigate()

    const onLogin = (name) => {
        AuthServer().anonymousLogin(name).then(result => {
            console.log(result)
            AuthServer().saveUserLocally(name)
            setName(name)
        })
    }

    const onLogout = () => {
        AuthServer().clearUserLocally()
        setName("")
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

    const loggedAlready = () => {
        return (
            <div>
                <div className="text-center">
                    <h5>Zalogowany jako: {name}</h5>
                    
                </div>
                <div className="button-group mt-5">
                    <Link to="/search" className="btn btn-primary m-2">Szukaj pokoju</Link>
                    <button type="button" className={`btn btn-${quickJoined ? "info" : "danger"} rounded-1 m-2`} onClick={quickRoom}>Szybka gra</button>
                    <button type="button" className="btn btn-danger m-2" onClick={onLogout}>Wyloguj</button>
                </div>
            </div>
        )
    }

    return(
        <div className="container">
            <MainLogo/>
            {name ? loggedAlready(): <AnonymousForm onClick={onLogin}/>}
        </div>
    )
}