import socket from "./Socket";

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

    return {
        anonymousLogin
    }
}