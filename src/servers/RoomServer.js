import socket from "./Socket"

export default function RoomServer(){
    const joinRoom = (userName, roomName, password) => {
        return new Promise((resolve, reject) => {
            socket.emit('stworz_pokoj', {wlasciciel: userName, nazwa: roomName, haslo: password})
            socket.on('komunikat', (response) => {
                socket.off('stworz_pokoj')
                socket.off('komunikat')
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const createRoom = (userName, roomName, password) => {
        return new Promise((resolve, reject) => {
            socket.emit('dolacz_do_pokoju', {gracz: userName, nazwa: roomName, haslo: password})
            socket.on('komunikat', (response) => {
                socket.off('komunikat')
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const leaveRoom = (roomName, userName) => {
        return new Promise((resolve, reject) => {
            socket.emit('opusc_pokoj', {gracz: userName, nazwa: roomName})
            socket.on('komunikat', (response) => {
                socket.off('dolacz_do_pokoju')
                socket.off('opusc_pokoj')
                socket.off('komunikat')
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const changePassword = (userName, roomName, password) => {
        return new Promise((resolve, reject) => {
            socket.emit('ustaw_haslo', {gracz: userName, nazwa: roomName, haslo: password})
            socket.on('komunikat', (response) => {
                socket.off('komunikat')
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    return {
        createRoom,
        joinRoom,
        leaveRoom,
        changePassword
    }
}