// ACCEPTED SIGNS:
// Spades Clubs -> BLACK
// Hearts Diamonds -> RED

import CardIcon from "./CardIcon"

export default function Card({value, sign, className}){

    const cardColor = (sign == 'H' || sign == 'D') ? 'danger' : 'dark'
    const icon = CardIcon({sign})
    return (
        <div className={`play-card text-${cardColor} shadow ${className}`}>
            <div className="card-sign card-st">
                {value} {icon}
            </div>
            <h1 className="card-sign display-1 fw-bold">{icon}</h1>
            <div className="card-sign card-be">
                {value} {icon}
            </div>
        </div>
    )
}