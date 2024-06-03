import { useState } from "react";
import { RiLoginCircleLine } from "react-icons/ri";

export default function AnonymousForm({onClick}){
    const [name, setName] = useState()

    const onchange = (e) => {
        setName(e.target.value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        onClick(name?.trim())
    }

    return(
        <form onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Podaj nazwe użytkownika</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="username" onChange={onchange}></input>
                    <button type="submit" className="btn btn-primary" disabled={!name?.trim()}><RiLoginCircleLine className="display-6"/></button>
                </div>
            </div>
        </form>
    )
}