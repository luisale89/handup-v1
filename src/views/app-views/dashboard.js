import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { setLocalState } from '../../helpers/handlers';
import { noSpace } from '../../helpers/validations'
import { Regiones } from '../../helpers/regiones'; //Regiones[15] es la región Metropolitana.
import { node } from 'prop-types';

export const Dashboard = () => {
    //eslint-disable-next-line
    const restaurant = {
        name: "name",
        street: "street",
        comuna: "comuna",
        phone: "phone",
        hours: "hours",
        open: "open",
        close: "close",
        logo: "logo",
        address: "address"
    };
    //eslint-disable-next-line
    const {store, actions} = useContext(Context); //global State

    const [form, setForm] = useState({ //local State
        fields: {} // fields: {name:{value:"", hover:false, editable:false}}
    });

    const [controls, setControls] = useState({
        address:{hover:false, editable:false},
        hours: {hover:false, aditable:false},
        submit: {show:false}
    });

    const handleInputChange = (e) => { 
        setForm({
            fields: setLocalState(form.fields, Object.assign(
                form.fields[e.target.name], {value: e.target.value})
            ),
            ...form
        });
    };

    const handleHoverIn = (e) => {
        if (e.currentTarget.dataset["control"] === "address") {
            setControls({
                address:Object.assign(controls.address, {hover:true}),
                ...controls
            })
        } else {
            setForm({
                fields: setLocalState(form.fields, Object.assign(
                    form.fields[e.currentTarget.dataset["control"]], {hover:true})
                ),
                ...form
            })
        }
    };

    const handleHoverOut = (e) => {
        if (e.currentTarget.dataset["control"] === "address") {
            setControls({
                address: setLocalState(controls.address, {hover:false}),
                ...controls
            });
        } else {
            setForm({
                fields: setLocalState(form.fields, Object.assign(
                    form.fields[e.currentTarget.dataset["control"]], {hover:false})
                ),
                ...form
            })
        }
    }

    const handleEditClick = (e) => {
        if (e === "address") {
            setControls({
                address: setLocalState(controls.address, {editable:true}),
                submit: setLocalState(controls.submit, {show:true}),
                ...controls
            })
        } else {
            setForm({
                fields: setLocalState(form.fields, Object.assign(
                    form.fields[e], {editable:true})
                ),
                ...form
            })
            setControls({
                submit: setLocalState(controls.submit, {show:true}),
                ...controls
            });
        };
    }

    useEffect(() => {
        // * se debe hacer llamada a API en esta función actions.loadAPI()
        let stt = {}
        for (let x in store.dashboard.restaurant) { // recorre todo el objeto que contiene la información del restaurant.
            Object.assign(stt, {[x]:{value: store.dashboard.restaurant[x], hover:false, editable:false}})
        };
        setForm({ // setForm se hará con el return de la llamada a la API, al ser un fetch
            fields: Object.assign(form.fields, stt),
            ...form
        });
        console.log(stt);
        //eslint-disable-next-line
    }, []);

    return (
        <div id="dashboard">
            
            <div className="main-info">
                {/*restaurant name forms*/}
                <form id="rest-form">
                {form.fields[restaurant.name] && form.fields[restaurant.name].editable ?
                    <div className="form-group">
                        <label className="form-label" htmlFor={restaurant.name}>Nombre: </label>
                        <span className="invalid-tooltip"></span>
                        <input
                            className=""
                            type="text"
                            placeholder="Nombre del restaurante" 
                            name={restaurant.name}
                            value= {form.fields[restaurant.name].value || ""}
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                        />
                    </div> 
                    : 
                    <div 
                        className="info-content"
                        data-control = {restaurant.name}
                        onMouseEnter={(e) => {handleHoverIn(e)}}
                        onMouseLeave={(e) => {handleHoverOut(e)}}
                        >
                        <span>Nombre: {store.dashboard.restaurant.name || ""}</span>
                        {form.fields[restaurant.name] ? form.fields[restaurant.name].hover && 
                        <span onClick={() => handleEditClick(restaurant.name)}>*edit_field*</span> : <div className={{display:"none"}}></div>}
                    </div>
                    }
                    {/* Address Forms */}
                    {controls.address.editable ? 
                        <div className="form-group">
                            <label className="form-label" htmlFor={restaurant.street}>Calle: </label>
                            <span className="invalid-tooltip"></span>
                            <input
                                className=""
                                type="text"
                                placeholder="Calle / Av." 
                                name={restaurant.street}
                                value= {form.fields[restaurant.street].value || ""}
                                onChange={handleInputChange}
                                required
                                autoComplete="off"
                            />
                            <label className="form-label" htmlFor={restaurant.comuna}>Comuna: </label>
                            <span className="invalid-tooltip"></span>
                            <select 
                                name={restaurant.comuna} 
                                value={form.fields[restaurant.comuna].value || ""}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecciona...</option>
                                {Regiones[15].comunas.sort().map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                })}
                            </select>
                        </div> 
                    : 
                    <div 
                        className="info-content"
                        data-control={restaurant.address}
                        onMouseEnter={(e) => {handleHoverIn(e)}}
                        onMouseLeave={(e) => {handleHoverOut(e)}}
                        >
                        <span>Dirección: {`${store.dashboard.restaurant.street || ""}, ${store.dashboard.restaurant.comuna || ""}`}</span>
                        {controls.address.hover && 
                        <span onClick={() => handleEditClick(restaurant.address)}>*edit_field*</span>}
                    </div>
                    }
                    {controls.submit.show && 
                    <div className="submit-area">
                        <span>Guardar</span>
                        <span>Cancelar</span>
                    </div>}
                </form>
                
                <div id="rest-logo">
                    <span>Logo:</span>
                    <img />
                </div>
            </div>
            {store.dashboard.stats.map((item, index) => {
                return (
                    <div className="stats" key={index}>
                        <p>{item.qty}</p>
                        <p>{item.title}</p>
                    </div>
                );
            })}
        </div>
    ); 
}