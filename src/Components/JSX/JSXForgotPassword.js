import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const JSXForgotPassword = ({ parent }) => {
    let {sent, setSent, email, sentHandler, error} = parent;
    let navigate = useNavigate()

    return (
        <>
            <div className='row  justify-content-center'>
                <div className='col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4'>
                    <div className="card">
                        <div className="card-body">
                            <p className='fs-1'>Forgot Password</p>
                            {!sent ?
                                <>
                                    <div className="mb-3">
                                        
                                        <input 
                                        ref={email}
                                        type="email" 
                                        className={"form-control "+(error? " is-invalid": "")} 
                                        id="exampleFormControlInput1" placeholder="name@example.com" />
                                        <label htmlFor="exampleFormControlInput1" 
                                        className={"form-label "+(error?" text-danger":"")}>Enter Email address</label>
                                    </div>

                                    <div className='d-grid'>
                                        <button
                                            onClick={sentHandler}
                                            type="button" className="btn btn-primary mb-2">Submit</button>
                                    </div>

                                    <div className="text-center lh-lg" onClick={e => e.preventDefault()}>
                                        <a
                                            onClick={() => navigate(-1)}
                                            href="#!" className='' >Go Back</a>

                                    </div>
                                </>


                                :
                                <>
                                    <p><b>We have sent a reset password link to this email:</b><br />"{email.current.value}"</p>
                                    
                                    <div className='d-grid'>
                                    <button className='btn btn-primary mb-4' onClick={() => navigate("/login")}>Back</button>
                                    </div>
                                    <p>did not recieve it? <Link to="/forgotpassword" onClick={() => setSent(false)}>send again</Link></p>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

export default JSXForgotPassword