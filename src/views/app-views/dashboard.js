import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { setLocalState } from '../../helpers/handlers';
// import { noSpace } from '../../helpers/validations'
// import { Regiones } from '../../helpers/regiones'; //Regiones[15] es la región Metropolitana.
// import { node } from 'prop-types';

export const Dashboard = () => {
    //eslint-disable-next-line
    const {store, actions} = useContext(Context); //global State

    const [form, setForm] = useState({ //local State
        fields: {
            name: {value:"", hover:false, editable:false},
            address: {value:"", hover:false, editable:false},
            phone: {value:"", hover:false, editable:false},
            open_time: {value:"", hover:false, editable:false},
            close_time: {value:"", hover:false, editable:false},
            logo: {value:"", hover:false, editable:false}
        }
    });

    const formFields = [
        {name:"name", label:"Nombre: " ,type:"text", fieldType:"input" ,placeholder:"Nombre del restaurante", required:"required", addStyle:"", sufix:""},
        {name:"address", label:"Dirección: " ,type:"text", fieldType:"input" ,placeholder:"Av. / Calle, Comuna", required:"required", addStyle:"", sufix:""},
        {name:"phone", label:"Teléfono: " ,type:"text", fieldType:"input",placeholder:"Teléfono", required:"required", addStyle:"", sufix:""},
        {name:"open_time", label:"Horario: " ,type:"time", fieldType:"input",placeholder:"12:00", required:"required", addStyle:"inline", sufix:"hrs"},
        {name:"close_time", label:"- " ,type:"time", fieldType:"input" ,placeholder:"00:00", required:"required", addStyle:"inline", sufix:"hrs"},
    ];  

    const handleInputChange = (e) => { 
        setForm({
            fields: setLocalState(form.fields, Object.assign(
                form.fields[e.target.name], {value: e.target.value})
            ),
            ...form
        });
    };

    const handleHoverIn = (e) => {
        setForm({
            fields: setLocalState(form.fields, Object.assign(
                form.fields[e.currentTarget.dataset["control"]], {hover:true}
            )),
            ...form
        });
        console.log(form);
    };

    const handleHoverOut = (e) => {
        setForm({
            fields: setLocalState(form.fields, Object.assign(
                form.fields[e.currentTarget.dataset["control"]], {hover:false}
            )),
            ...form
        })
    };

    const handleClickEdit = (event) => {
        const e = event.currentTarget.dataset["control"];
        
        if (e.includes("_time")) {
            setForm({
                fields: setLocalState(form.fields, {
                    close_time: {...form.fields.close_time, editable: true},
                    open_time: {...form.fields.open_time, editable: true}
                })
            })
        } else {
            setForm({
                fields: setLocalState(form.fields, Object.assign(
                    form.fields[e], {editable:true})
                ),
                ...form
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        // * se debe hacer llamada a API en esta función actions.loadAPI()
        let stt = {};
        for (let x in store.dashboard.restaurant) { // recorre todo el objeto que contiene la información del restaurant.
            Object.assign(stt, {[x]:JSON.parse(JSON.stringify({value: store.dashboard.restaurant[x], hover:false, editable:false}))})
        };
        setForm({ // setForm se hará con el return de la llamada a la API, al ser un fetch
            fields: setLocalState(form.fields, stt),
            ...form
        });
        //eslint-disable-next-line
    }, []);

    return (
        <div id="dashboard">
            <div className="main-info">
                <form id="rest-profile" onSubmit={handleSubmit} noValidate autoComplete="off">
                    {formFields.map((item, index) => {
                        return (
                            form.fields[item.name].editable ? 
                            <div key={index} className={`${item.addStyle} form-group`}>
                                <label className="form-label" htmlFor={item.name}>{item.label}</label>
                                {item.fieldType === "input" && 
                                    <input
                                    className="input-field"
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    value={form.fields[item.name].value}
                                    onChange={(e) => handleInputChange(e)}
                                    required={item.required}
                                    />
                                }
                                <span className="invalid-tooltip" style={{display:"none"}}></span>
                            </div>
                            :
                            <div key={index} className={`${item.addStyle} form-legend`}>
                                <span>{item.label}</span>
                                <span
                                data-control={item.name}
                                onClick={(e) => handleClickEdit(e)}
                                onMouseEnter={(e) => handleHoverIn(e)}
                                onMouseLeave={(e) => {handleHoverOut(e)}}
                                style={{cursor:"pointer"}}
                                >
                                    {`${store.dashboard.restaurant[item.name]} ${item.sufix}`}
                                    {form.fields[item.name].hover && <span>*edit*</span>}
                                </span>
                            </div>
                        )
                    })}
                    <button type="submit">Submit</button>
                    <button>Cancelar</button>
                </form>
                <div className="rest-logo">
                    <img alt="restaurant-logo"/>
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