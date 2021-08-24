import React, {useReducer} from "react";
import jwt from "jsonwebtoken"

let initialState = {
    token: '',
    user: {},
};

const AppContext = React.createContext(initialState);

let reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case "set-token-header": {
            let decoded = jwt.decode(action.payload);
            // console.log(decoded);
            return {
                ...state,
                token: action.payload,
                user: {
                    email: decoded.email,
                    role: decoded.role,
                }
            };
        }
        case "LOGOUT": {
            return {...state, token: '', user: {}};
        }
        case "show-message": {
            return {...state, open: true, message: action.payload};
        }
        case "close-message": {
            return {...state, open: false};
        }
        default:
            return {...state};
    }
};

function AppProvider(props) {
    let [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    );
}

export {AppContext, AppProvider};