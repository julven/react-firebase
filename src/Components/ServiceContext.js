import React, { createContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DB } from './Firebase';
import withConnect from './ReduxMap';


let ServiceContext = createContext();

let ServiceProvider = ({ children, reduxListSetter, reduxListStates }) => {

    let param = useParams();
    let [radio, setRadio] = useState("all")
    let [search, setSearch] = useState("")
    let [list, setList] = useState({
        page: 1,
        pages: [],
        limit: 10
    })

    let log = (val) => {
        let logging = false;
        if(logging) console.log(val)
    }


    let validEmail = (email) => {

        let isValid = true;
        let valid = {
            atSign: email.includes("@"),
            atSignStart: email[0] !== "@",
            atSignEnd: email[email.length - 5] !== "@",
            dotCom: email.substring(email.length - 4, email.length) === ".com"

        }
        if (!email) isValid = false;
        if (!valid.atSign || !valid.atSignStart || !valid.atSignEnd || !valid.dotCom) {
            isValid = false;
        }

        return isValid

    }

    


    let fieldValid = (fields) => {
        let valid = true
        Object.keys(fields).forEach(e => {
            // console.log(e + " is " + (fields[e] === "" ? "valid": "empty"))
            if (fields[e] === "") valid = false
        })

        return valid
    }

    return (
        <ServiceContext.Provider value={
            { 
                validEmail, 
                fieldValid, 
                log,
            }
        }>
            {children}
        </ServiceContext.Provider>
    )
}
ServiceProvider = withConnect(ServiceProvider)
export { ServiceProvider, ServiceContext };