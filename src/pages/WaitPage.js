import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function WaitPage(){

    const [params, setParams] = useSearchParams()
    const players = ["janek123","maciek","zdzichu"]
    const name = params.get('name')

    useEffect(() => {
        console.log("jestem")

        return(() => {
            console.log("i mnie nie ma")
        })
    }, [])

    const peopleInRoom = () => {
        return players.map((player, index) => {
            return <p className="fw-bold" key={index}>{player}</p>
        })
    }

    return (
        <div className="container">
            <h1>Lobby pokoju {name}</h1>
            <hr/>
            <p className="display-4">lista graczy</p>
            {peopleInRoom()}
            <div className="d-flex flex-row">
                <Link to={"/search"} className="btn btn-danger mt-2">Wyjdz z pokoju</Link>
                <button type="button" className="btn btn-success ms-auto mt-2" disabled={players.length < 2}>Rozpocznij gre</button>
            </div>
        </div>
    )
}