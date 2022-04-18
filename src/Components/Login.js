import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH, DB } from './Firebase';
import JSXLogin from './JSX/JSXLogin';
import withConnect from './ReduxMap';

const Login = ({reduxAccountStates, reduxAccountSetter}) => {

    let navigate = useNavigate();
    let email = useRef(null)
    let password = useRef(null)
    let [error, setError] = useState(false)
    let [load, setLoad] = useState(false)

    let loginHandler = e => {
        setLoad(true)
        setError(false)
        // console.log(email.current.value,password.current.value)
        AUTH.login( 
            email.current.value,
            password.current.value
        ).then( resp => {
            
            if(!resp) {
                setError(true)
                setLoad(false)
                alert("invalid username or password")
                password.current.value = ""
                return;
            }
            // console.log("login")
            setLoad(false)
            reduxAccountSetter.setLogged(true)
            DB.readOne("user", resp.user.uid).then( resp2 => {
                reduxAccountSetter.setAccount(resp2);
            })
            // console.log({login: resp.user.uid})
        })
    }

    return (
        <>
        {/* <h2>Login</h2>
        <table>
            <tbody>
                <tr>
                    <td>Email</td>
                    <td><input type="email" ref={email}/></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" ref={password}/></td>
                </tr>
            </tbody>
        </table>
        <button onClick={loginHandler}>Login</button><span> </span>
        <button onClick={() => navigate("/register")}>Register</button><br/>
        <button onClick={() => navigate("/forgotpassword")}>Forgot Password</button> */}
        <JSXLogin parent={{email, password, loginHandler, error, load}}/>
        </>
    )
}

export default withConnect(Login) ;