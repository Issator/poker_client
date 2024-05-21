import socket from "./Socket"

const values = ['A',2,3,4,5,6,7,8,9,10,'J',"Q","K"]
const signs = ['S','C','H','D']

export default function CardServer(){
    const changeCard = () => {
        return {
            value: values[Math.floor(Math.random() * values.length)],
            sign: signs[Math.floor(Math.random() * signs.length)],
        }
    }

    const getCard = () => {
        return {
            value: values[Math.floor(Math.random() * values.length)],
            sign: signs[Math.floor(Math.random() * signs.length)],
        }
    }

    const getCards = (roomId, username) => {
        return new Promise((resolve, reject) => {
            socket.emit('sprawdz_karty', {gracz: username, id: roomId})
            socket.on('aktualizacja', (response) => {
                socket.off('sprawdz_karty')
                socket.off('aktualizacja')
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const fold = () => {
        console.log("fold")
    }

    const call = () => {
        console.log("call")
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
        getCards,
        changeCard,
        getCard,
        fold,
        call,
        check,
        bet,
        raise,
        allIn
    }
}