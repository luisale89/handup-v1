import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    const landing_links = [ //en esta variable se definen todas las rutas de la app. role va a mostrar las correspondientes.
        //app links
        {id:"1", name: "Conóncenos", to: '/nosotros'},
        {id:"2", name: "Beneficios", to: '/beneficios'},
        {id:"3", name: "Contacto", to: '/contacto'},
    ]

    return (
        <nav id="navbar">
            <div className="navbar-header">
                <NavLink to='/' className="app-logo">
                    <span>Handup - Logo</span>
                </NavLink>
            </div>
            <div className="navbar-control">
                <div id="toggle-menu" onClick={actions.open_sidebar}>
                    Menú
                </div>
                <div className="login">
                    <button className="btn">Iniciar Sesión</button>
                </div>
            </div>
            <ul className="navbar-nav show">
                {landing_links.map(item => {
                    return (
                        <li key={item.id}>
                            <NavLink 
                            className="nav-link"
                            to={item.to} 
                            activeClassName="active" 
                            exact
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}