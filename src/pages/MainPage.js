import AnonymousForm from "../components/Forms/AnonymousForm";
import AuthServer from "../servers/AuthServer";

export default function MainPage(){
    const onClick = (name) => {
        AuthServer().anonymousLogin(name).then(result => {
            console.log(result)
        })
    }

    return(
        <div className="container">
            <h1 className="display-2 text-center my-5 pt-3">Poker - Online</h1>
            <AnonymousForm onClick={onClick}/>
        </div>
    )
}