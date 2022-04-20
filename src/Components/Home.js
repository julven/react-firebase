import React, { useEffect, useState } from 'react';
import { AUTH, DB } from './Firebase';
import JSXHome from './JSX/JSXHome';
import withConnect from './ReduxMap';

const Home = ({reduxAccountStates, reduxAccountSetter}) => {

    let [summary,setSummary] = useState ({
        male: 0,
        female: 0,
        total: 0,
    })
    let [load, setLoad] = useState(true)

    let logoutHandler = e => {
        
        e.preventDefault()
        AUTH.logout().then(() => {
            reduxAccountSetter.setLogged(false)
            reduxAccountSetter.setAccount({         
                fname: "",
                lname: "",
                email: "",
                password: "",
                bday: "",
                image: "",
            })
        })
    }

    useEffect(() => {
       setLoad(true)
        // console.log("useEffect Home")
        let male = 0;
        let female = 0;
        let total = 0;
        DB.readAll().then(list => {
            setLoad(false)
            // console.log({list})
            list.forEach( x => {
                if(x.gender === "female") female++;
                if(x.gender === "male") male++;
                total++
            }) 

            // console.log({male, female, total})

            setSummary({
                male,
                female,
                total
            })
        })
    }, [])

    if(load) return <>loading...</>

    return (
        <>
            {/* <h2>Home</h2>
            <p>Welcome <b>{reduxAccountStates.fname}</b></p>
            <p><b>List Summary</b></p>
            <table>
                <tbody>
                    
                    <tr>
                        <td>Male :</td>
                        <th> {summary.male}</th>
                    </tr>
                    <tr>
                        <td>Female :</td>
                        <th> {summary.female}</th>
                    </tr>
                    <tr>
                        <td>Total :</td>
                        <th> {summary.total}</th>
                    </tr>
                </tbody>
            </table> */}
            <JSXHome parent={{summary, reduxAccountStates, reduxAccountSetter, logoutHandler}}/>
        </>
    )
}

export default withConnect (Home);