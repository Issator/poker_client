import React, { useState } from 'react';
export default function Settings() {

    const resetColors = () => {
        document.documentElement.style.setProperty('--opponent-card', "#0d6efd")
        document.documentElement.style.setProperty('--player-card', "#ffffff")
        document.documentElement.style.setProperty('--pik', "#000000")
        document.documentElement.style.setProperty('--trefl', "#000000")
        document.documentElement.style.setProperty('--kier', "#dc3545")
        document.documentElement.style.setProperty('--karo', "#dc3545")
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000";

        const opponentElements = document.querySelectorAll('.bg-opponent-card');
        opponentElements.forEach(opponentElement => {
            opponentElement.style.backgroundImage = '';
            opponentElement.style.backgroundColor = "#0d6efd"; 
        });

        document.body.style.backgroundColor = "#ffffff";
        document.body.style.backgroundImage = ''; 

        //document.getElementById("reversColor").value = "#0d6efd"
        document.getElementById("aversColor").value = "#ffffff"
        document.getElementById("pikColor").value = "#000000"
        document.getElementById("treflColor").value = "#000000"
        document.getElementById("kierColor").value = "#dc3545"
        document.getElementById("karoColor").value = "#dc3545"
        //document.getElementById("BackgroundColor").value = "#ffffff"

        if (tableOption === 'image') {
            toggleTableOption('color');
        }

        if (reverseOption === 'image') {
            toggleReverseOption('color');
        }

        setTableImage(null);
        setReverseImage(null);
        setTableOption('color');
        setReverseOption('color');
        }

    const changeColors = () => {
        const opponentElements = document.querySelectorAll('.bg-opponent-card');
    
        opponentElements.forEach(opponentElement => {
            if (reverseOption === 'image') {
                opponentElement.style.backgroundImage = `url(${reverseImage})`;
                opponentElement.style.backgroundColor = ''; 
            } else {
                const opponentColor = document.getElementById("reversColor").value;
                opponentElement.style.backgroundColor = opponentColor;
                opponentElement.style.backgroundImage = ''; 
            }
        });
    
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

        const backgroundColor = document.getElementById("BackgroundColor")?.value ?? "#ffffff";
        if (tableOption === 'image') {
            document.body.style.backgroundImage = `url(${tableImage})`;
            document.body.style.backgroundColor = ''; 
        } else {
            document.body.style.backgroundColor = backgroundColor;
            document.body.style.backgroundImage = ''; 
        }

        
        if (isDarkColor(backgroundColor)) {
            document.body.style.color = "#ffffff";
        } else {
            document.body.style.color = "#000000";
        }
    }
    const [tableOption, setTableOption] = useState('color'); 
    const [reverseOption, setReverseOption] = useState('color'); 
    const [tableImage, setTableImage] = useState(null); 
    const [reverseImage, setReverseImage] = useState(null); 

    const toggleTableOption = (option) => {
        setTableOption(option); 
    }

    const toggleReverseOption = (option) => {
        setReverseOption(option); 
    }

    const isDarkColor = (color) => {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    }

    const tableImages = [
        { id: 1, src: '/stol1.jpg', alt: "Stół 1" },
        { id: 2, src: '/stol2.jpg', alt: "Stół 2" },
        { id: 3, src: '/stol3.jpg', alt: "Stół 3" }
      ];
      
      const reverseImages = [
        { id: 1, src: '/rewers1.jpg', alt: "Rewers 1" },
        { id: 2, src: '/rewers2.jpg', alt: "Rewers 2" },
        { id: 3, src: '/rewers3.jpg', alt: "Rewers 3" }
      ];

      const colorSettings = () => {
        return (
            <>
                <hr />
                <div className="d-flex">
                    <input
                        type="radio"
                        id="tableColorOption"
                        value="color"
                        checked={tableOption === 'color'}
                        onChange={() => toggleTableOption('color')}
                        className="form-check-input"
                    />
                    <label htmlFor="tableColorOption" className="ms-1 my-auto">Kolor stołu</label>
                </div>
                <div className="d-flex">
                    <input
                        type="radio"
                        id="tableImageOption"
                        value="image"
                        checked={tableOption === 'image'}
                        onChange={() => toggleTableOption('image')}
                        className="form-check-input"
                    />
                    <label htmlFor="tableImageOption" className="ms-1 my-auto">Grafika stołu</label>
                </div>
                {tableOption === 'image' && (
                    <div className="d-flex">
                        {tableImages.map(image => (
                            <div key={image.id} style={{ marginRight: "10px", cursor: "pointer", border: image.src === tableImage ? "2px solid green" : "none" }} onClick={() => setTableImage(image.src)}>
                                <img src={image.src} alt={image.alt} style={{ width: "75px", height: "75px" }} />
                            </div>
                        ))}
                    </div>
                )}
                {tableOption === 'color' && (
                    <>
                        <div className="d-flex">
                            <input type="color" id="BackgroundColor" defaultValue="#ffffff" className="form-control form-control-color" />
                            <label htmlFor="BackgroundColor" className="ms-1 my-auto">Stół</label>
                        </div>
                        <hr />
                    </>
                )}
                {/* Analogicznie, dodajemy opcje dla rewersu */}
                <div className="d-flex">
                    <input
                        type="radio"
                        id="reverseColorOption"
                        value="color"
                        checked={reverseOption === 'color'}
                        onChange={() => toggleReverseOption('color')}
                        className="form-check-input"
                    />
                    <label htmlFor="reverseColorOption" className="ms-1 my-auto">Kolor rewersu</label>
                </div>
                <div className="d-flex">
                    <input
                        type="radio"
                        id="reverseImageOption"
                        value="image"
                        checked={reverseOption === 'image'}
                        onChange={() => toggleReverseOption('image')}
                        className="form-check-input"
                    />
                    <label htmlFor="reverseImageOption" className="ms-1 my-auto">Grafika rewersu</label>
                </div>
                {reverseOption === 'image' && (
                    <div className="d-flex">
                        {reverseImages.map(image => (
                            <div key={image.id} style={{ marginRight: "10px", cursor: "pointer", border: image.src === reverseImage ? "2px solid green" : "none" }} onClick={() => setReverseImage(image.src)}>
                                <img src={image.src} alt={image.alt} style={{ width: "75px", height: "75px" }} />
                            </div>
                        ))}
                    </div>
                )}
                {reverseOption === 'color' && (
                    <>
                        <div className="d-flex">
                            <input type="color" id="reversColor" defaultValue="#0d6efd" className="form-control form-control-color" />
                            <label htmlFor="reversColor" className="ms-1 my-auto">Rewers kart</label>
                        </div>
                        <hr/>
                    </>
                )}
                <div className="d-flex">
                    <input type="color" id="aversColor" defaultValue="#ffffff" className="form-control form-control-color" />
                    <label htmlFor="aversColor" className="ms-1 my-auto">Awers kart</label>
                </div>
                <hr/>
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
        );
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
                    <div id="collapseDefaultOne" class="accordion-collapse collapse" aria-labelledby="headingDefaultOne" data-bs-parent="#accordionDefault">
                        <div class="accordion-body border-3">
                            {colorSettings()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}