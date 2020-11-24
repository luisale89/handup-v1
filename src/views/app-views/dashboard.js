import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { handleChange } from '../../helpers/handlers';
import { noSpace } from '../../helpers/validations'

export const Dashboard = () => {
    //eslint-disable-next-line
    const restaurant = {
        name: "rest_name",
        address: "rest_addr",
        phone: "rest_phon",
        hours: "rest_hour",
        open: "rest_open",
        close: "rest_close",
        logo: "rest_logo"
    };

    const {store, actions} = useContext(Context); //global State

    const [form, setForm] = useState({ //local State
        rest_fields: {}
    });

    const [controls, setControls] = useState({
        rest_name: {hover:false, editable: false},
        rest_addr: {hover:false, editable: false},
        rest_phon: {hover:false, editable: false},
        rest_hour: {hover:false, editable: false}
    });

    const handleInputChange = (event) => { 
        setForm({
            rest_fields: handleChange(event, form.rest_fields),
            ...form
        });
    };

    const handleHoverIn = (e) => {
        setControls({
            [e.currentTarget.htmlFor]: Object.assign(controls[e.currentTarget.htmlFor], {hover:true}),
            ...controls
        });
    };

    const handleHoverOut = (e) => {
        setControls({
            [e.currentTarget.htmlFor]: Object.assign(controls[e.currentTarget.htmlFor], {hover:false}),
            ...controls
        })
    }

    const handleEditClick = (e) => {
        setControls({
            [e]: Object.assign(controls[e], {editable:true}),
            ...controls
        })
    }

    useEffect(() => {
        // * se debe hacer llamada a API en esta sección, para actualizar el store al montar el comp.
        // * función para llamada a API se encontrará en actions..
        setForm({ // *setForm se hará con el return de la llamada a la API, al ser un fetch
            rest_fields: Object.assign(form.rest_fields, store.dashboard_data.rest_info),
            ...form
        });
        //eslint-disable-next-line
    }, []);

    return (
        <div id="dashboard">
            <div className="information">
                <form id="rest-info">
                    <div className="form-group">
                        <span>Nombre:</span>
                        {!controls[restaurant.name].editable && 
                        <label 
                            htmlFor={restaurant.name}
                            onMouseEnter={(e) => handleHoverIn(e)}
                            onMouseLeave={(e) => handleHoverOut(e)}
                            >
                            {store.dashboard_data.rest_info[restaurant.name] || ""}
                            {controls[restaurant.name].hover && 
                            <span onClick={() => handleEditClick(restaurant.name)}>edit_field</span>}
                        </label>}
                        {controls[restaurant.name].editable && 
                        <input
                            className=""
                            type="text"
                            placeholder="Nombre del restaurante" 
                            name={restaurant.name}
                            value= {form.rest_fields[restaurant.name] || ""}
                            onChange={handleInputChange}
                            required
                            autoComplete="off" //! 2 validate
                        />}
                        {controls[restaurant.name].editable && 
                        <div style={{display:"inline-block"}}>
                            <span>Guardar </span> {/*onClick will call the API to save changes*/}
                            <span>Cancelar </span>
                        </div>
                        }
                    </div>
                </form>
                <div id="rest-logo">
                    <span>Logo:</span>
                    <img />
                </div>
            </div>
            {store.dashboard_data.app_stats ? store.dashboard_data.app_stats.map((item, index) => {
                return (
                    <div className="stats" key={index}>
                        <p>{item.qty}</p>
                        <p>{item.title}</p>
                    </div>
                );
            }) : <div></div>}
        </div>
    ); 
}