import { HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function RoomItem({data}){
    return (
        <div className="card my-2 p-0">
            <div className="card-body d-flex flex-row p-0">
                <div className="p-2 ms-3">
                    <h5 className="card-title">{data}</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="ms-auto d-flex">
                    <Link to={`/room?name=${data}`} className="btn btn-primary align-content-center"><HiArrowRight style={{fontSize: "1.5rem"}}/></Link>
                </div>
            </div>
        </div>
    )
}