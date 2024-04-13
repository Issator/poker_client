// ACCEPTED SIGNS:
// Spades Clubs -> BLACK
// Hearts Diamonds -> RED
import CardIcon from "./CardIcon"

// const array = ['A',2,3,4,5,6,7,8,9,10,'J',"Q","K"]

export default function Card({value, sign, id, className = "", hidden=false, onClick=onClick}){

    const cardColor = (sign == 'H' || sign == 'D') ? 'danger' : 'dark'
    const icon = CardIcon({sign})

    if(hidden){
        return (
            <div className={`play-card text-primary shadow me-2 ${className} bg-primary`}>
            </div>
        )
    }
    
    return (
        <div className={`play-card text-${cardColor} shadow me-2 ${className} size-on-hover`} onClick={() => onClick(id)}>
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