import RoomList from "../components/Room/RoomList";

export default function RoomPage(){
    return (
        <div className="container">
            <h1 className="display-4 text-center mt-4">Wybierz pokój</h1>
            <RoomList/>
        </div>
    )
}