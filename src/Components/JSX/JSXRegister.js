import React from "react";
import { useNavigate } from "react-router-dom";

const JSXRegister = ({ parent }) => {

    let navigate = useNavigate();
    let {
        field,
        error,
        load,
        submitHandler,
        uploadHandler,
        imgPrev
    } = parent;

    return (
        <div className="row justify-content-center">
            <div className='col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5'>
                <div className="card">
                    <div className="card-body">
                        <p className='fs-1'>Register</p>
                        <div className="text-center">
                            <img className=" mb-1" src='' ref={imgPrev} style={{ height: 90, width: 90, border: "1px solid grey", borderColor: error?"red": "" }} /><br />
                            <input type="file" accept='image/png, image/jpeg' ref={field.image} hidden onChange={uploadHandler} />
                            <button style={{ width: 90}} className="btn btn-sm btn-primary mb-4" onClick={() => { field.image.current.click() }} disabled={load}>Upload</button>
                        </div>

                        <div className="mb-1">
                            <input 
                            ref={field.email}
                            type="email" className={"form-control "+(error? "is-invalid":"")} id="email" placeholder="name@example.com" />
                            <label htmlFor="email" className={"form-label "+(error?"text-danger":"")}>Email address</label>
                        </div>

                        <div className="mb-1">
                            <input 
                            ref={field.fname}
                            type="text" className={"form-control "+(error? "is-invalid":"")} id="fname" placeholder="first name..." />
                            <label htmlFor="fname" className={"form-label "+(error?"text-danger":"")}>First Name</label>
                        </div>

                        <div className="mb-1">
                            <input 
                            ref={field.lname}
                            type="text" className={"form-control "+(error? "is-invalid":"")} id="lname" placeholder="last name..." />
                            <label htmlFor="lname" className={"form-label "+(error?"text-danger":"")}>Last Name</label>
                        </div>

                        <div className="mb-3">
                            <input
                            ref={field.bday}
                            type="date" className={"form-control "+(error? "is-invalid":"")} id="bday" />
                            <label htmlFor="bday" className={"form-label "+(error?"text-danger":"")}>Birthday</label>
                        </div>

                        <div className="mb-1">
                            <input 
                            ref={field.password}
                            type="password" className={"form-control "+(error? "is-invalid":"")} id="password" />
                            <label htmlFor="bday" className={"form-label "+(error?"text-danger":"")}>Password</label>
                        </div>

                        <div className="mb-3">
                            <input 
                            ref={field.confirm}
                            type="password" className={"form-control "+(error? "is-invalid":"")} id="confirm" />
                            <label htmlFor="confirm" className={"form-label "+(error?"text-danger":"")}>Confirm</label>
                        </div>

                        <div onClick={e => e.preventDefault()}>
                            <div className='d-grid'>
                                <button
                                    onClick={submitHandler}
                                    type="button" 
                                    className={"btn btn-primary mb-2"} disabled={load}>Register</button>
                            </div>

                            <div className="text-center lh-lg">
                                <a
                                    onClick={() => navigate(-1)}
                                    href="#!" className='' disabled={load}>Go back</a>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default JSXRegister