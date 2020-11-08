import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const Sidebar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    const app_links = [ //en esta variable se definen todas las rutas de la app. role va a mostrar las correspondientes.
        //app links
        {id:"1", name: "Información", to: '/dashboard', icon: 'icon'},
        {id:"2", name: "Mesas", to: '/mesas', icon: 'icon'},
        {id:"3", name: "Menú", to: '/menu', icon: 'icon'},
        {id:"4", name: "Garzones", to: '/garzones', icon: 'icon'},
    ]

    return (
        <div id="side-navbar" className = {store.side_bar ? "show": "hide"}>
            <div className="navbar-nav">
                {app_links.map(item => {
                    return (
                        <NavLink 
                            className="nav-link"
                            key={item.id}
                            to={item.to} 
                            onClick={actions.close_sidebar} 
                            activeClassName="active" 
                            exact
                            >
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                        </NavLink>
                    )
                })}
            </div>
            <div className="close-session" onClick={actions.close_sidebar}><p>&times; Cerrar sesión</p></div>
        </div>
    );
}