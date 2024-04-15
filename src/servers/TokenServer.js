export default function TokenServer(){
    const fold = () => {
        console.log("fold")
    }

    const wait = () => {
        console.log("wait")
    }

    const check = () => {
        console.log("check")
    }

    const bet = () => {
        console.log("bet")
    }

    const raise = () => {
        console.log("raise")
    }

    const allIn = () => {
        console.log("allIn")
    }

    return {
        fold,
        wait,
        check,
        bet,
        raise,
        allIn
    }
}