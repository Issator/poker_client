import { Link } from "react-router-dom";
import AnonymousForm from "../components/Forms/AnonymousForm";
import AuthServer from "../servers/AuthServer";
import MainLogo from "../components/MainLogo";

export default function MainPage(){
    const onClick = (name) => {
        AuthServer().anonymousLogin(name).then(result => {
            console.log(result)
            AuthServer().saveUserLocally(name)
        })
    }

    const loggedAlready = () => {
        return (
            <div>
                <div className="text-center">
                    <h5>Zalogowany jako: {AuthServer().getUserName()}</h5>
                    
                </div>
                <div className="button-group mt-5">
                    <Link to="/search" className="btn btn-primary m-2">Szukaj pokoju</Link>
                    <button type="button" className="btn btn-danger m-2" onClick={AuthServer().clearUserLocally}>Wyloguj</button>
                </div>
            </div>
        )
    }

    return(
        <div className="container">
            <MainLogo/>
            {AuthServer().getUserName() ? loggedAlready(): <AnonymousForm onClick={onClick}/>}
        </div>
    )
}