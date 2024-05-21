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

    const getFirstCards = async (username) => {
        return new Promise((resolve, reject) => {
            socket.emit('rozdanie', {nazwa: username})
            socket.on("rozdanie", (response) => {
                socket.off('rozdanie')
                socket.off('karty')
                reject(response)
            })

            socket.on('karty', (response) => {
                socket.off('rozdanie')
                socket.off('karty')
                resolve(response)
            })

            setTimeout(() => {reject("timeout")}, 1000)
        })
    }

    return {
        changeCard,
        getCard,
        getFirstCards,
        fold,
        call,
        check,
        bet,
        raise,
        allIn
    }
}