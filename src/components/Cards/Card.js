// ACCEPTED SIGNS:
// Spades Clubs -> BLACK
// Hearts Diamonds -> RED

import CardIcon from "./CardIcon"

export default function Card({value, sign, className = "", hidden=false}){

    const cardColor = (sign == 'H' || sign == 'D') ? 'danger' : 'dark'
    const icon = CardIcon({sign})

    if(hidden){
        return (
            <div className={`play-card text-primary shadow me-2 ${className} bg-primary`}>
                <div className="card-sign card-st ">
                    0
                </div>
                <h1 className="card-sign display-6 fw-bold">0</h1>
                <div className="card-sign card-be">
                    0
                </div>
            </div>
        )
    }
    return (
        <div className={`play-card text-${cardColor} shadow me-2 ${className}`}>
            <div className="card-sign card-st">
                {value} {icon}
            </div>
            <h1 className="card-sign display-6 fw-bold">{icon}</h1>
            <div className="card-sign card-be">
                {value} {icon}
            </div>
        </div>
    )
}