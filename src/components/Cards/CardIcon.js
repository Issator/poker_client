// ACCEPTED SIGNS:
// Spades Clubs Hearts Diamonds

import { GiClubs, GiDiamonds, GiHearts, GiSpades } from "react-icons/gi";

export default function CardIcon({sign, className}){
    if(sign == 'S'){
        return <GiSpades className={className}/>
    }

    if(sign == 'C'){
        return <GiClubs className={className}/>
    }

    if(sign == 'H'){
        return <GiHearts className={className}/>
    }

    if(sign == 'D'){
        return <GiDiamonds className={className}/>
    }

    return <p className={className}> ? </p>

}