export default function Settings() {

    const resetColors = () => {
        document.documentElement.style.setProperty('--opponent-card', "#0d6efd")
        document.documentElement.style.setProperty('--player-card', "#ffffff")
        document.documentElement.style.setProperty('--pik', "#000000")
        document.documentElement.style.setProperty('--trefl', "#000000")
        document.documentElement.style.setProperty('--kier', "#dc3545")
        document.documentElement.style.setProperty('--karo', "#dc3545")

        document.getElementById("reversColor").value = "#0d6efd"
        document.getElementById("aversColor").value = "#ffffff"
        document.getElementById("pikColor").value = "#000000"
        document.getElementById("treflColor").value = "#000000"
        document.getElementById("kierColor").value = "#dc3545"
        document.getElementById("karoColor").value = "#dc3545"

    }

    const changeColors = () => {
        const opponentColor = document.getElementById("reversColor").value
        document.documentElement.style.setProperty('--opponent-card', opponentColor)

        const cardColor = document.getElementById("aversColor").value
        document.documentElement.style.setProperty('--player-card', cardColor)

        const pikColor = document.getElementById("pikColor").value
        document.documentElement.style.setProperty('--pik', pikColor)

        const treflColor = document.getElementById("treflColor").value
        document.documentElement.style.setProperty('--trefl', treflColor)

        const kierColor = document.getElementById("kierColor").value
        document.documentElement.style.setProperty('--kier', kierColor)

        const karoColor = document.getElementById("karoColor").value
        document.documentElement.style.setProperty('--karo', karoColor)
    }

    const colorSettings = () => {
        return (
            <>
            <hr className="m-1 p-0" />
                <div className="d-flex">
                    <input type="color" id="reversColor" defaultValue="#0d6efd" className="form-control form-control-color" />
                    <label htmlFor="reversColor" className="ms-1 my-auto">Rewers kart</label>
                </div>

                <div className="d-flex">
                    <input type="color" id="aversColor" defaultValue="#ffffff" className="form-control form-control-color" />
                    <label htmlFor="aversColor" className="ms-1 my-auto">Awers kart</label>
                </div>

                <hr />

                <div className="d-flex">
                    <input type="color" id="pikColor" defaultValue="#000000" className="form-control form-control-color" />
                    <label htmlFor="pikColor" className="ms-1 my-auto">Pik</label>
                </div>

                <div className="d-flex">
                    <input type="color" id="treflColor" defaultValue="#000000" className="form-control form-control-color" />
                    <label htmlFor="treflColor" className="ms-1 my-auto">Trefl</label>
                </div>

                <div className="d-flex">
                    <input type="color" id="kierColor" defaultValue="#dc3545" className="form-control form-control-color" />
                    <label htmlFor="kierColor" className="ms-1 my-auto">Kier</label>
                </div>

                <div className="d-flex">
                    <input type="color" id="karoColor" defaultValue="#dc3545" className="form-control form-control-color" />
                    <label htmlFor="karoColor" className="ms-1 my-auto">Karo</label>
                </div>

                <button className="btn btn-primary mt-2 w-100" type="button" onClick={changeColors}>Zmień</button>
                <button className="btn btn-warning mt-2 w-100" type="button" onClick={resetColors}>Resetuj kolory</button>
            </>
        )
    }

    return (
        <div className="settings">
            <div className="accordion  shadow" id="accordionDefault">
                <div className="accordion-item border-3">
                    <h2 className="accordion-header" id="headingDefaultOne">
                        <button type="button" className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseDefaultOne" aria-expanded="true" aria-controls="collapseDefaultOne">
                            <h6 className="display-6 text-center me-2">Ustawienia</h6>
                        </button>
                    </h2>
                    <div id="collapseDefaultOne" class="accordion-collapse collapse show" aria-labelledby="headingDefaultOne" data-bs-parent="#accordionDefault">
                        <div class="accordion-body border-3">
                            {colorSettings()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}