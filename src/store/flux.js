//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            user_logged: false,
            loading_API: false,
            display_login: false,
            user: {
                id: 0,
                fname:"Luis",
                lname:"Lucena"
            }
		},
		actions: {
            showLogin: () => {
                setStore({display_login: true});
            },
            hideLogin: () => {
                setStore({display_login: false});
            },
            login_user: () => {
				/*
					login_function to complete with API
                */
               setStore({user_logged: true});
               return "user logged-in";
            },
            logout_user: () => {
				/*
					logout_function to complete with API
                */
                setStore({user_logged: false});
                return "user logged-out";
            },
            loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
                */
               setStore({loading_API: true})
            }
            // set_role: (role) => { // establece el rol global de la app para las configuraciones.
            //     const store = getStore();
            //     role = typeof(role) !== 'undefined' ? role : store.user.roles[0].role;

            //     store.user.roles.forEach(item => { //what happens if user.role is empty?
            //         if (item.role === role) {
            //             setStore({current_role: role});
            //         }
            //     });
            //     // sessionStorage.setItem("a_token", "luis");
            //     // document.cookie = "name = luis, path = /, domain = localhost";//create a cookie that all app will see.
            //     // history.push(`/${store.app_roles[role].name}`); //set_role se debe ejecutar después del login efectivo del usuario.
            // }
		}
	};
};

export default getState;