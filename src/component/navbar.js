import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    return (
        <div id="navbar">
            <NavLink to='/dashboard' className="app-logo">
                <div>Handup - Logo</div>
            </NavLink>
            <div id="open-sidebar" onClick={actions.open_sidebar}>Menú</div>
        </div>
    );
}