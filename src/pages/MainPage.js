import { Link } from "react-router-dom";
import AnonymousForm from "../components/Forms/AnonymousForm";
import AuthServer from "../servers/AuthServer";
import MainLogo from "../components/MainLogo";
import { useState } from "react";

export default function MainPage(){
    const [name, setName] = useState(AuthServer().getUserName()
)
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

    const loggedAlready = () => {
        return (
            <div>
                <div className="text-center">
                    <h5>Zalogowany jako: {name}</h5>
                    
                </div>
                <div className="button-group mt-5">
                    <Link to="/search" className="btn btn-primary m-2">Szukaj pokoju</Link>
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