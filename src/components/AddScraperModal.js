import React from 'react';
import '../CSS/AddScraperModal.css'

const addScraperModal = props => (
    
    <div className="addscrapper_modal">
        <header className="modal_header">
            <h1>Add new scraper</h1>
        </header>
        <div className="modal_content_div">
            <form className="modal_form">
                <div className="form-control">
                    <label htmlFor="currency">Criptomoneda</label>
                    <input id="currency" type="text" placeholder="Ingresar criptomoneda" className="form-control"></input>
                </div>
                <div className="form-control">
                    <label htmlFor="frequency">Frecuencia</label>
                    <input id="frequency" type="number" placeholder="Ingresar frecuencia" min="1" className="form-control" onChange={props.onChangeFrequency}></input>
                </div>
            </form>
            <div className="modal_functions">
                <button className="btn custom-btn" onClick={props.confirm} >Confirmar</button>
                <button className="btn custom-btn" onClick={props.cancel} >Cancelar </button>
            </div>
        </div>
    </div>
    
    )


export default addScraperModal