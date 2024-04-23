import MainLogo from "../components/MainLogo";
import RoomList from "../components/Room/RoomList";

export default function RoomPage(){
    return (
        <div className="container">
            <MainLogo/>
            <h1 className="display-5 text-center mt-4">Wybierz pokój</h1>
            <RoomList/>
        </div>
    )
}