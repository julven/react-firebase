import { createContext } from "react";
import { createStore } from "redux";

let reduxAccountState = {
    test: "redux account state",
    logged: false,
    fname: "",
    lname: "",
    email: "",
    password: "",
    bday: "",
    image: "",
}

let reduxAccountReducer = (state = reduxAccountState, {type, payload}) => {
    switch (type) {

        case "SET_TEST":

            return {
                ...state,
                test: payload
            };
        case "SET_LOGGED": 
            // console.log("set logged")
            return {
                ...state,
                logged: payload
            };

        case "SET_ACCOUNT": 

        
            return {
                ...state,
                ...payload
            };


        default: return state;
    }
}

let reduxAccountContext = createContext();
let reduxAccountStore = createStore(reduxAccountReducer);

let mapReduxAccountStateToProps = state => {
    return {reduxAccountStates: state}
}

let mapReduxAccountDispatchToProps = dispatch => {
    return {
        reduxAccountSetter: {
            setTest: data => { dispatch({type:"SET_TEST", payload: data})},
            setLogged: data => {dispatch({type: "SET_LOGGED", payload: data})},
            setAccount: data => {dispatch({type: "SET_ACCOUNT", payload: data})}
        }
    }
}

export   {
    reduxAccountState, 
    reduxAccountStore, 
    reduxAccountContext,
    mapReduxAccountDispatchToProps,
    mapReduxAccountStateToProps
}

