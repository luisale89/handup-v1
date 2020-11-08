import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Context } from './store/appContext';

//! Views
import { Dashboard } from './views/dashboard';
import { Home } from './views/home';
import { NotFound } from './views/notFound';

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
                    <section id="app-content">
                        <Switch>
                            <Route path="/dashboard" component={Dashboard} />
                            {/* notFound*/}
                            <Route render={() => <NotFound />} />
                            <Route render={() => <Redirect to="/dashboard" />} />
                        </Switch>
                    </section>
                </div>
            </BrowserRouter>
        );
    } else {
        return ( //Public Views
            <BrowserRouter>
                <ScrollToTop>
                    <div id="landing">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component ={Home} />
                            {/* <Route path="/conocenos" component={About} />
                            <Route path="/beneficios" component={Benefits} />
                            <Route path="/contacto" component={Contact} /> */}
                            <Route render={() => <NotFound />} />
                        </Switch>
                    </div>
                </ScrollToTop>
            </BrowserRouter>
        )
    }
};

export default injectContext(Layout);