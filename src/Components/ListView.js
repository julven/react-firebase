import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DB } from "./Firebase";
import withConnect from "./ReduxMap";
import moment from "moment";

const ListView = ({ reduxListStates }) => {

    let param = useParams()
    let navigate = useNavigate()
    let editHandler = e => {
        // console.log(param.id)
        navigate("/listedit/" + param.id)
    }
    let [fields, setFields] = useState({
        fname: "",
        lname: "",
        bday: "",
        image: "",
        id: "",
        gender: "",
    })
    let [load, setLoad] = useState(true)

    useEffect(() => {
        setLoad(true)
        DB.readOne("person", param.id).then(resp => {
            // console.log(resp)
            if (!resp) navigate("/list", { replace: true });
            setFields({ ...fields, ...resp })
            setLoad(false)
        })

    }, [])

    if(load) return <>loading...</>

    return (
        <>
            <div className="row justify-content-center">
                <div className='col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4'>
                    <div className="card">
                        <div className="card-body">
                            <p className='fs-1 '>View Person</p>
                            <div className="text-center">
                                <img
                                    alt={fields.image}
                                    src={fields.image}
                                    style={{ width: 90, height: 90, border: "1px solid gray" }} /><br />
                            </div>


                            <table className="table table-borderless" >
                                <tbody>

                                    <tr>
                                        <td className="text-end">First Name</td>
                                        <td style={{minWidth: 60}}className="text-capitalize"><b>{fields.fname}</b></td>
                                    </tr>
                                    <tr>
                                        <td className="text-end">Last Name</td>
                                        <td className="text-capitalize"><b>{fields.lname}</b></td>
                                    </tr>
                                    <tr>
                                        <td className="text-end">Birthday</td>
                                        <td className="text-capitalize"><b>{moment(fields.bday).format("MMMM D, YYYY")}</b></td>
                                    </tr>
                                    <tr>
                                        <td className="text-end">Gender</td>
                                        <td className="text-capitalize"><b>{fields.gender}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-grid">
                                    <button className="btn btn-primary mb-1" onClick={editHandler}>Edit</button>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-grid">
                                    <button className="btn btn-outline-primary mb-1" onClick={() => navigate(-1)}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default withConnect(ListView);