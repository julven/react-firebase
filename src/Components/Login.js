import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH, DB } from './Firebase';
import withConnect from './ReduxMap';

const Login = ({reduxAccountStates, reduxAccountSetter}) => {

    let navigate = useNavigate();
    let email = useRef(null)
    let password = useRef(null)

    let loginHandler = e => {
        // console.log(email.current.value,password.current.value)
        AUTH.login( 
            email.current.value,
            password.current.value
        ).then( resp => {
            
            if(!resp) {
                alert("invalid username or password")
                password.current.value = ""
                return;
            }
            reduxAccountSetter.setLogged(true)
            DB.readOne("user", resp.user.uid).then( resp2 => {
                reduxAccountSetter.setAccount(resp2);
            })
            // console.log({login: resp.user.uid})
        })
    }

    // useEffect(() => {
    //     console.log(reduxAccountStates)
    // }, [reduxAccountStates])
    

    return (
        <>
        <h2>Login</h2>

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
        <button onClick={() => navigate("/forgotpassword")}>Forgot Password</button>
        
        </>
    )
}

export default withConnect(Login) ;