import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';
import logo from "../img/app-logo.png";
import { Login_modal } from "../component/login_modal";

export const Navbar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    const [state, setState] = useState({ //local Store
        menu: false
    });

    const toggle_menu = () => {
        state.menu ? setState({menu:false}) : setState({menu:true})
    }

    const landing_links = [ //en esta variable se definen todas las rutas de la app. role va a mostrar las correspondientes.
        //app links
        {id:"1", name: "Inicio", to:'/'},
        {id:"2", name: "Conóncenos", to: '/nosotros'},
        {id:"3", name: "Beneficios", to: '/beneficios'},
        {id:"4", name: "Contacto", to: '/contacto'},
    ]

    return (
        <nav id="navbar">
            <div className="navbar-header">
                <NavLink to='/' className="app-logo">
                    <img src={logo} alt="app-logo" style={{width:"200px", height:"auto"}}/>
                </NavLink>
            </div>
            <div className="navbar-control">
                <div id="toggle-menu" onClick={() => toggle_menu()}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="login">
                    <button 
                        className="btn"
                        onClick={actions.showLogin}
                        >
                            Iniciar sesión
                    </button>
                </div>
            </div>
            <div className={`navbar-nav ${state.menu ? "show": "hide"}`}>
                {landing_links.map(item => {
                    return (
                        <NavLink 
                        key={item.id}
                        className="nav-link"
                        to={item.to} 
                        activeClassName="active" 
                        onClick={() => toggle_menu()}
                        exact
                        >
                            {item.name}
                        </NavLink>
                    )
                })}
            </div>
            <Login_modal />
        </nav>
    );
}