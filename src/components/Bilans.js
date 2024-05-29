export default function Bilans({players, round, licitation}) {
    return (
        <div className="bilans">
            <div className="card p-3 border-3 shadow">
                <p>Runda {round} - licytacja {licitation}/2</p>
                <h6 className="display-6 text-center">Bilans</h6>
                <hr className="m-1 p-0" />

                {players.map(player => {
                    return (
                        <div className="m-0 p-0 d-flex" key={player.name}>{player.name} <span className="ms-auto">{player.rest}</span></div>
                    )
                })}
            </div>
        </div>
    )
}