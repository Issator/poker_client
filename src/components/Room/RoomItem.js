import { HiArrowRight } from "react-icons/hi2";

export default function RoomItem(){
    return (
        <div className="card my-2 p-0">
            <div className="card-body d-flex flex-row p-0">
                <div className="p-2 ms-3">
                    <h5 class="card-title">Nazwa pokoju</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="ms-auto d-flex">
                    <button type="button" className="btn btn-primary"><HiArrowRight style={{fontSize: "1.5rem"}}/></button>
                </div>
            </div>
        </div>
    )
}