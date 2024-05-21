import socket from "./Socket"

export default function RoomServer(){
    const createRoom = (userName, roomName, password) => {
        return new Promise((resolve, reject) => {
            socket.emit('stworz_pokoj', {wlasciciel: userName, nazwa: roomName, haslo: password})
            socket.on('stworz_pokoj', (response) => {
                socket.off('stworz_pokoj')
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const getRooms = () => {
        return new Promise((resolve, reject) => {
            socket.emit('wyswietl_pokoje')
            socket.on('lista_pokoi', response => {
                socket.off('lista_pokoi')
                socket.off('wyswietl_pokoje')

                if(!response.pokoje){
                    resolve({pokoje: []})
                }

                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const joinRoom = (userName, roomId, password) => {
        return new Promise((resolve, reject) => {
            socket.emit('dolacz_do_pokoju', {gracz: userName, id: roomId, haslo: password})
            socket.on('dolacz_do_pokoju', (response) => {
                socket.off('dolacz_do_pokoju')

                if(response.error){
                    reject(response)
                }
                
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const leaveRoom = (roomId, userName) => {
        return new Promise((resolve, reject) => {
            socket.emit('opusc_pokoj', {gracz: userName, id: roomId})
            socket.on('opuszczanie_pokoju', (response) => {
                socket.off('opuszczanie_pokoju')
                socket.off('opusc_pokoj')
                resolve(response)
            })

            setTimeout(resolve, 1000)
        })
    }

    const getPlayersInRoom = (roomId) => {
        return new Promise((resolve, reject) => {
            socket.emit("sprawdz_graczy_w_pokoju", {id: roomId})
            socket.on("lista_graczy_w_pokoju", response => {
                socket.off("sprawdz_graczy_w_pokoju")
                socket.off("lista_graczy_w_pokoju")

                if(response.error){
                    reject(response)
                }

                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const changePassword = (userName, roomId, password) => {
        return new Promise((resolve, reject) => {
            socket.emit('ustaw_haslo', {gracz: userName, id: roomId, haslo: password})
            socket.on('ustawienie_hasla', (response) => {
                socket.off('ustawienie_hasla')
                socket.off('ustaw_haslo')
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const startGame = (username, roomName) => {
        socket.emit(`start_game`,{nazwa: roomName, gracz: username})
    }

    return {
        createRoom,
        joinRoom,
        leaveRoom,
        changePassword,
        getRooms,
        getPlayersInRoom,
        startGame
    }
}