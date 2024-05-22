import socket from "./Socket"

const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const signs = ['Kier', 'Karo', 'Trefl', 'Pik']

export default function CardServer(room_id){

    const getCards = (username) => {
        socket.emit('start_gry', {gracz: username, id: room_id}) 
    }

    const fold = () => {
        socket.emit('pas', {id: room_id})
    }

    const call = () => {
        socket.emit('sprawdzenie', {id: room_id})
    }

    const check = () => {
    }

    const bet = (amount) => {
        socket.emit('postawienie', {id: room_id, stawka: amount})
    }

    const raise = (amount) => {
        socket.emit('podbicie', {id: room_id, stawka: amount})
    }

    const allIn = () => {
        socket.emit('va_banque', {id: room_id})
    }


    return {
        getCards,
        fold,
        call,
        check,
        bet,
        raise,
        allIn
    }
}