import Hand from "../components/Hand/Hand";
export default function GamePage(){

    return(
        <div className="vh-100 p-5">
            <div className="board h-100 position-relative">
                <div className="top-hand w-100">
                    <Hand/>
                </div>

                <div className="bottom-hand w-100">
                    <Hand player/>
                </div>

                <div className="left-hand h-100 d-flex align-items-center">
                    <div className="rotation-90">
                        <Hand/>
                    </div>
                </div>

                <div className="right-hand h-100 d-flex align-items-center">
                    <div className="rotation-270">
                        <Hand/>
                    </div>
                </div>
            </div>
        
        </div>
    )
}