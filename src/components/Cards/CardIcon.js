// ACCEPTED SIGNS:
// Spades Clubs Hearts Diamonds

import { GiClubs, GiDiamonds, GiHearts, GiSpades } from "react-icons/gi";

export default function CardIcon({sign, className}){
    if(sign == 'Pik'){
        return <GiSpades className={className}/>
    }

    if(sign == 'Trefl'){
        return <GiClubs className={className}/>
    }

    if(sign == 'Kier'){
        return <GiHearts className={className}/>
    }

    if(sign == 'Karo'){
        return <GiDiamonds className={className}/>
    }

    return <p className={className}> ? </p>

}