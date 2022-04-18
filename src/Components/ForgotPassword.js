import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from './Firebase';
import JSXForgotPassword from './JSX/JSXForgotPassword';
import { ServiceContext } from './ServiceContext';


const ForgotPassword = () => {
    let context = useContext(ServiceContext)
    let [sent, setSent] = useState(false);
    let email = useRef(null);
    let [error, setError] = useState(false)
    let navigate = useNavigate();

    let sentHandler = () => {
        setError(false)
        if(!context.validEmail(email.current.value)) {
            alert("email format is invalid!")
            setError(true)
            return
        }
        AUTH.resetPass(email.current.value).then( resp => {
            if(!resp) {
                setError(true)
                alert("email provided is invalid or not registered!")
                return;
            }
            setSent(true);
        })
        
    }
    // if(!sent) return (
    //     <>
    //         <h2>Forgot Password</h2>

    //         <p>
    //             enter email address <br />
    //             <input type="email" ref={email}/>
    //         </p>
    //         <button onClick={sentHandler}>Submit</button> <span> </span>
    //         <button onClick={() => navigate("/login")}>Cancel</button>
    //     </>
    // )

    // return (
    //     <>
    //         <h2>Forgot Password</h2>
    //         <p><b>We have sent a reset password link to this email:</b><br/>"{email.current.value}"</p>
    //         <p>did not recieve it? <Link to="/forgotpassword" onClick={() => setSent(false)}>send again</Link></p>
    //         <button onClick={() => navigate("/login")}>Back</button>
    //     </>
    // )

    return (
        <JSXForgotPassword parent={{sent, setSent, email, sentHandler, error}} />
    )
}

export default ForgotPassword;