import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';
import logo from "../img/app-logo.png";
import { ReactComponent as Home } from "../img/home.svg";
import { ReactComponent as QRcode } from "../img/qrcode.svg";
import { ReactComponent as Menu } from "../img/menu.svg";
import { ReactComponent as People } from "../img/people.svg";
import { ReactComponent as Close } from "../img/close.svg";

export const Sidebar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    const app_links = [ //en esta variable se definen todas las rutas de la app. role va a mostrar las correspondientes.
        //app links
        {id:"1", name: "Información", to: '/dashboard', icon: <Home />},
        {id:"2", name: "Mesas", to: '/mesas', icon: <QRcode />},
        {id:"3", name: "Menú", to: '/menu', icon: <Menu />},
        {id:"4", name: "Garzones", to: '/garzones', icon: <People />},
    ]

    return (
        <nav id="sidebar-container" className={store.side_bar ? "full":"small"}>
            <div className="sidebar-header">
                <NavLink to='/dashboard' className="app-logo">
                    <img src={logo} alt="app-logo" style={{width:"200px", height:"auto"}}/>
                </NavLink>
                <div id="toggle-sidebar" onClick={actions.open_sidebar}>Menú</div>
            </div>
            <div className={`sidebar-body ${store.side_bar ? "show":"hide"}`}>
                <div className="sidebar-nav">
                    {app_links.map(item => {
                        return (
                            <NavLink
                                key={item.id} 
                                className="nav-link"
                                to={item.to} 
                                onClick={actions.close_sidebar} 
                                activeClassName="active" 
                                exact
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                            </NavLink>
                        )
                    })}
                </div>
                <div className="close-session" onClick={actions.close_sidebar}>
                    <span><Close /></span>
                    <span>Cerrar sesión</span>
                </div>
            </div>
        </nav>
    );
}