import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { validate_all, validate_field, noSpace } from '../helpers/validations';
import { handleChange } from '../helpers/handlers';
import { ReactComponent as ShowPW } from "../img/show_pw.svg";

export const LoginDropDown = () => {

    const {store, actions} = useContext(Context);

    const rq_names= {
        email: "login_email",
        password: "login_password"
    }

    const [state, setState] = useState({ //local Store
        controls: {
            passwordShown: false //para mostrar/ocultar la contraseña.
        },
        fields: {
            [rq_names.email]: "",
            [rq_names.password]: ""
        },
        rq_feedback: {
            [rq_names.email]: {class: "", msg: ""},
            [rq_names.password]: {class: "", msg: ""}
        }
    });

    const handleSubmit = (event) => { //event is the form that submit
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        if (state.controls.passwordShown) { //evita hacer las validaciones cuando el type del campo "password" es un texto.
            return;
        }
        const {valid, feedback} = validate_all(event.target.id, state.rq_feedback) // valida todos los campos requeridos del formulario con id

        setState({
            rq_feedback: feedback,
            ...state
        });

        if (valid) { // si todos los campos requeridos fueron validados
            const result = actions.login_user(); // envío de formulario a API - Recibe mensajes desde backend y muestra feedback en formulario en caso de algún error.
            console.log(result);
        } else {
            console.log("no cumple");
        };
    };

    const handleInputChange = (event) => { 
        setState({
            fields: handleChange(event, state.fields),
            rq_feedback: Object.assign(state.rq_feedback, {[event.target.name]:{class:"", msg:""}}),
            ...state
        })
        // check_field(event);
    };

    const check_field = (event) => {
        setState({rq_feedback: validate_field(event, state.rq_feedback), ...state});
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick, false);
        return () => {
            document.removeEventListener('mousedown', handleClick, false);
        }
        //eslint-disable-next-line
    }, []);

    const handleClick = (event) => {
        const node = document.getElementById("login-form");
        if (node.contains(event.target) || store.loading_API) {
            return undefined;
        };
        actions.hideLogin();
    };

    const show_password = () => {
        setState({
            controls: Object.assign(state.controls, {passwordShown: true}),
            ...state
        });
    };

    const hide_password = () => {
        setState({
            controls: Object.assign(state.controls, {passwordShown: false}),
            ...state
        });
    };

    return (
        <div id="login-dropDown" className={store.display_login ? "show" : "hide"}>
            <div className="login-body">
                <form id="login-form" onSubmit={handleSubmit} noValidate autoComplete="on">
                    {/* email field */}
                    <div className="form-group g-1">
                        <label htmlFor={rq_names.email}>Usuario</label>
                        <span className={`invalid-tooltip ${state.rq_feedback[rq_names.email].class}`}>{state.rq_feedback[rq_names.email].msg}</span>
                        <input
                            className={state.rq_feedback[rq_names.email].class}
                            type="email" 
                            placeholder="Ingesa tu usuario" 
                            name={rq_names.email}
                            value={state.fields[rq_names.email] || ""}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            required
                        />
                    </div>
                    {/* pasword field */}
                    <div className="form-group g-2">
                        <label htmlFor={rq_names.password}>Contraseña</label>
                        <span className={`invalid-tooltip ${state.rq_feedback[rq_names.password].class}`}>{state.rq_feedback[rq_names.password].msg}</span>
                        <input 
                            className={state.rq_feedback[rq_names.password].class}
                            type={state.controls.passwordShown ? "text" : "password"} //cambia para mostrar/esconder contraseña ingresada.
                            placeholder="Ingresa tu contraseña" 
                            name={rq_names.password}
                            value={state.fields[rq_names.password] || ""}
                            onKeyPress={noSpace}
                            onChange={handleInputChange}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            required
                        />
                        <span 
                            className="show-password"
                            onMouseEnter={show_password}
                            onMouseLeave={hide_password}
                            >
                                <ShowPW />
                        </span>
                    </div>
                    {/* submit button */}
                    <button 
                        className="btn g-3"
                        type="submit"
                        disabled={store.loading_API}>
                            {store.loading_API ? <span>Cargando...</span> : "Aceptar"}
                    </button>
                </form>
            </div>
        </div>
    )

}