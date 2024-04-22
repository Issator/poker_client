import AnonymousForm from "../components/Forms/AnonymousForm";
import AuthServer from "../servers/AuthServer";

export default function MainPage(){
    const onClick = (name) => {
        AuthServer().anonymousLogin(name).then(result => {
            console.log(result)
            AuthServer().saveUserLocally(name)
        })
    }

    const loggedAlready = () => {
        return (
            <>
                <h1>Zalogowany jako: {AuthServer().getUserName()}</h1>
                <button type="button" className="btn btn-primary" onClick={AuthServer().clearUserLocally}>Wyloguj</button>
            </>
        )
    }

    return(
        <div className="container">
            <h1 className="display-2 text-center my-5 pt-3">Poker - Online</h1>
            {AuthServer().getUserName() ? loggedAlready(): <AnonymousForm onClick={onClick}/>}
        </div>
    )
}