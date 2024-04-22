import socket from "./Socket";

const localStorageName = "USERNAME"

export default function AuthServer(){
    const anonymousLogin = async (name) => {
        return new Promise((resolve, reject) => {
            socket.emit("rejestracja", {"nazwa": name})
            socket.on("komunikat", (response) => {
                socket.off("rejestracja")
                socket.off("komunikat")
                resolve(response)
            })

            setTimeout(reject, 1000)
        })
    }

    const saveUserLocally = (username) => {
        localStorage.setItem(localStorageName, username)
    }

    const clearUserLocally = () => {
        localStorage.removeItem(localStorageName)
    }

    const getUserName = () => {
        return localStorage.getItem(localStorageName)
    }

    return {
        anonymousLogin,
        saveUserLocally,
        clearUserLocally,
        getUserName
    }
}