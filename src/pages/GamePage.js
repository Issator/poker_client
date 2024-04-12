import Card from "../components/Cards/Card";

const array = ['A',2,3,4,5,6,7,8,9,10,'J',"Q","K"]

export default function GamePage(){

    const line = (sign) => {
        return (
            <div className="d-flex flex-row justify-content-evenly mb-3" style={{width: '200rem'}}>
                {array.map(value => {
                    return <Card value={value} sign={sign}/>
                })}
            </div>
        )
    }

    return(
        <>
        <h1>Game Page</h1>
        {line("H")}
        {line("S")}
        {line("D")}
        {line("C")}
        </>
    )
}