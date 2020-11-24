import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Context } from './store/appContext';

//! Views
import { Dashboard } from './views/app-views/dashboard';
import { Home } from './views/landing-views/home';
import { About } from './views/landing-views/about';

// ? components
import { Sidebar } from "./component/sidebar";
import { Navbar } from "./component/navbar";

import injectContext from "../src/store/appContext";

//create your first component
export const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	//eslint-disable-next-line
    // const basename = process.env.BASENAME || "";

    //eslint-disable-next-line
    const {store, actions} = useContext(Context); //global store

    if (store.user_logged) {
        return ( //the whole app is protected.
            <BrowserRouter>
                <div id="main-app">
                    <Sidebar />
                    <ScrollToTop >
                        <section id="app-content">
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                {/* redirect when not found*/}
                                <Route render={() => <Redirect to="/dashboard" />} />
                            </Switch>
                        </section>
                    </ScrollToTop>
                </div>
            </BrowserRouter>
        );
    } else {
        return ( //Public Views
            <BrowserRouter>
                <Navbar />
                <ScrollToTop>
                    <div id="landing">
                        <Switch>
                            <Route exact path="/" component ={Home} />
                            <Route path="/nosotros" component={About} />
                            {/* <Route path="/beneficios" component={Benefits} />
                            <Route path="/contacto" component={Contact} /> */}
                            <Route render={() => <Redirect to="/" />} />
                        </Switch>
                    </div>
                </ScrollToTop>
            </BrowserRouter>
        )
    }
};

export default injectContext(Layout);