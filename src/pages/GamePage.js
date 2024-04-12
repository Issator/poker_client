import Card from "../components/Cards/Card";

const array = ['A',2,3,4,5,6,7,8,9,10,'J',"Q","K"]

export default function GamePage(){

    const line = (sign) => {
        return (
            <div className="d-flex flex-row justify-content-evenly mb-3" style={{width: '60rem'}}>
                {array.map(value => {
                    return <Card value={value} sign={sign}/>
                })}
            </div>
        )
    }

    return(
        <div className="vh-100 p-5">
            <div className="board h-100 position-relative">
                <div className="top-hand w-100">
                    <div className="hand">
                        <Card value={12} sign={"D"}  hidden={true} />
                        <Card value={8} sign={"C"}   hidden={true} />
                        <Card value={2} sign={"H"}   hidden={true} />
                        <Card value={"K"} sign={"D"} hidden={true} />
                        <Card value={"J"} sign={"S"} hidden={true} />
                    </div>
                </div>

                <div className="bottom-hand w-100">
                    <div className="hand">
                        <Card value={12} sign={"D"} />
                        <Card value={8} sign={"C"}  />
                        <Card value={2} sign={"H"}  />
                        <Card value={"K"} sign={"D"}/>
                        <Card value={"J"} sign={"S"}/>
                    </div>
                </div>

                <div className="left-hand h-100 d-flex align-items-center">
                    <div className="hand d-flex rotation-90">
                        <Card value={12} sign={"D"}  hidden={true} />
                        <Card value={8} sign={"C"}   hidden={true} />
                        <Card value={2} sign={"H"}   hidden={true} />
                        <Card value={"K"} sign={"D"} hidden={true} />
                        <Card value={"J"} sign={"S"} hidden={true} />
                    </div>
                </div>

                <div className="right-hand h-100 d-flex align-items-center">
                    <div className="hand rotation-270">
                        <Card value={12} sign={"D"}  hidden={true} />
                        <Card value={8} sign={"C"}   hidden={true} />
                        <Card value={2} sign={"H"}   hidden={true} />
                        <Card value={"K"} sign={"D"} hidden={true} />
                        <Card value={"J"} sign={"S"} hidden={true} />
                    </div>
                </div>
            </div>
        
        </div>
    )
}