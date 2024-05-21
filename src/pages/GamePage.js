import { useSearchParams } from "react-router-dom";
import Hand from "../components/Hand/Hand";
import AuthServer from "../servers/AuthServer";
export default function GamePage(){

    const [params, setParams] = useSearchParams()
    const room_id = params.get('id')
    const players = params.get('players')
    const playerName = AuthServer().getUserName()

    return(
        <div className="vh-100 p-5">
            <div className="board h-100 position-relative">
                <div className="top-hand w-100">
                    <Hand/>
                </div>

                <div className="bottom-hand w-100">
                    <Hand player roomId={room_id} playerName={playerName}/>
                </div>

                {players >= 3 && <div className="left-hand h-100 d-flex align-items-center">
                    <div className="rotation-90">
                        <Hand/>
                    </div>
                </div>}

                {players == 4 && <div className="right-hand h-100 d-flex align-items-center">
                    <div className="rotation-270">
                        <Hand/>
                    </div>
                </div>}
            </div>
        
        </div>
    )
}