import React, { useContext, useState } from 'react';
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

    const [state, setState] = useState({ //local Store
        side_bar: false
    });

    const toggle_menu = () => {
        state.side_bar ? setState({side_bar:false}) : setState({side_bar:true})
    }

    const close_menu = () => {
        setState({side_bar:false})
    }

    const logout = () => {
        close_menu();
        const result = actions.logout_user();
        console.log(result);
    }

    const app_links = [ //en esta variable se definen todas las rutas de la app. role va a mostrar las correspondientes.
        //app links
        {id:"1", name: "Información", to: '/dashboard', icon: <Home />},
        {id:"2", name: "Mesas", to: '/mesas', icon: <QRcode />},
        {id:"3", name: "Menú", to: '/menu', icon: <Menu />},
        {id:"4", name: "Garzones", to: '/garzones', icon: <People />},
    ]

    return (
        <nav id="sidebar-container">
            <div className="sidebar-header">
                <NavLink to='/dashboard' className="app-logo">
                    <img src={logo} alt="app-logo" style={{width:"200px", height:"auto"}}/>
                </NavLink>
                <div id="toggle-sidebar" onClick={() => toggle_menu()}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={`sidebar-body ${state.side_bar ? "show":"hide"}`}>
                <div className="sidebar-nav">
                    {app_links.map(item => {
                        return (
                            <NavLink
                                key={item.id} 
                                className="nav-link"
                                to={item.to} 
                                onClick={() => close_menu()}
                                activeClassName="active" 
                                exact
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                            </NavLink>
                        )
                    })}
                </div>
                <div className="close-session" onClick={() => logout()}>
                    <Close />
                    <span>Cerrar sesión</span>
                </div>
            </div>
        </nav>
    );
}