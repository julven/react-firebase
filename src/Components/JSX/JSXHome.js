import React from "react";
import { AUTH } from "../Firebase";

const JSXHome = ({ parent }) => {

    let { summary, reduxAccountStates, logoutHandler } = parent

    

    return (
        <div className='row justify-content-center'>

            <div className='col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5'>
                <div className="card">
                    <div className="card-body">
                        <p className='fs-1'>Home</p>

                        <p>Welcome <span className="fw-bold text-capitalize">
                            {reduxAccountStates.fname + " " +
                                reduxAccountStates.lname}

                        </span>
                            <br />
                            <a href="#/login" onClick={(e) => logoutHandler(e)}>Logout</a>
                        </p>
                        <p className="fs-4">Summary</p>
                        <div className="text-center">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">Male</th>
                                        <th scope="col">Female</th>
                                        <th scope="col">Total</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">{summary.male}</td>
                                        <td scope="row">{summary.female}</td>
                                        <td scope="row">{summary.total}</td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default JSXHome