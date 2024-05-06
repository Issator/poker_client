import { FaDoorOpen } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import { IoPeopleSharp, IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function RoomItem({data}){
    return (
        <div className="card my-2 p-0">
            <div className="card-body d-flex flex-row p-0">
                <div className="p-2 ms-3">
                    <h5 className="card-title"><FaDoorOpen/> {data.nazwa}</h5>
                    <div className="card-text">
                        <p><IoPersonSharp/> {data.wlasciciel}</p>
                        <p><IoPeopleSharp/> {data.liczba_graczy}</p>
                    </div>
                </div>
                <div className="ms-auto d-flex">
                    <Link to={`/room?name=${data.nazwa}`} className="btn btn-primary align-content-center"><HiArrowRight className="display-6"/></Link>
                </div>
            </div>
        </div>
    )
}