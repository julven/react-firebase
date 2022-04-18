import React from 'react'
import { useNavigate } from 'react-router-dom'

const JSXLogin = ({parent}) => {
    let {email, password, loginHandler, error, load} = parent;
    let navigate = useNavigate()


    return (

        <div className='row justify-content-center'>

            <div className='col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4'>
                <div className="card mt-5">
                    <div className="card-body">
                        <p className='fs-1'>Login</p>
                        <div className="form-outline mb-2">
                            <input 
                            placeholder="name@example.com"
                            className={"form-control " + (error ? "is-invalid" : "")}
                            type="email" id="form2Example1"ref={email}/>
                            <small 
                            className={"fw-bold form-label " + (error ? "text-danger": "")}
                            htmlFor="form2Example1">Email address</small>
                        </div>


                        <div className="form-outline mb-4">
                            <input 
                             className={"form-control " + (error ? "is-invalid" : "")}
                            type="password" id="form2Example2"  ref={password}/>
                            <small 
                            className={"fw-bold form-label " + (error ? "text-danger": "")}
                            htmlFor="form2Example2">Password</small>
                        </div>
                        <div onClick={e => e.preventDefault()}>
                            <div className='d-grid'>
                                <button
                                disabled={load}
                                onClick={() => loginHandler()}
                                type="button" className="btn btn-primary mb-2">Sign in</button>
                            </div>

                            <div className="text-center lh-lg">
                                <a 
                                onClick={()=> navigate("/forgotpassword")}
                                href="#!" className='' >Forgot password?</a>
                                <p>No account? <a 
                                                    onClick={() => navigate("/register")}
                                                    href="#!">Register</a></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JSXLogin