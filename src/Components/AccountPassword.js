import React, { useState } from "react";
import { AUTH } from "./Firebase";
import withConnect from "./ReduxMap";

const AccountPassword = ({ reduxAccountStates, reduxAccountSetter, editPass }) => {

    let [field, setField] = useState({
        conf: "",
        new: "",
    })
    let [loading, setLoading] = useState(false)

    let passwordHandler = () => {
        setLoading(true)
        let checkValid = {
            match: field.new === field.conf,
            length: field.new.length >= 4,
        }

        if (!checkValid.length) {
            setField({ new: "", conf: "" })
            alert("must be atleast 4 characters long")
            setLoading(false)
            return
        }

        if (!checkValid.match) {
            setField({ new: "", conf: "" })
            alert("new and confirm did not match!")
            setLoading(false)
            return
        }

        AUTH.changePass(field.new).then(resp => {
            if (resp) {
                alert("password changed successfully")
                editPass(false)
                setLoading(false)
                return
            }
            setLoading(false)
            alert("something went wrong!")
            AUTH.logout().then(resp => {
                if (resp) reduxAccountSetter.setLogged(false)
            });

        })
    }

    let fieldHandler = (e, fields) => {

        setField({
            ...field,
            [fields]: e.target.value
        })
    }

    return (
        <div >
            <p className="fs-4">Change Password</p>
            <table className="table table-borderless mx-auto">
                <tbody>
                    <tr>
                        <td className=" text-end fw-bold d-none d-sm-block">New </td>
                        <td className="text-start">
                            <input
                                className="form-control"
                                type="password" value={field.new} onChange={e => fieldHandler(e, "new")} />
                            <small className="fw-bold d-block d-sm-none">New Password</small>
                        </td>
                    </tr>
                    <tr>
                        <td className=" text-end fw-bold  d-none d-sm-block">Confirm </td>
                        <td className="text-start">
                            <input
                                className="form-control"
                                type="password" value={field.conf} onChange={e => fieldHandler(e, "conf")} />
                            <small className="fw-bold d-block d-sm-none">Confirm</small>
                        </td>
                    </tr>
                </tbody>
            </table>

            {loading ?
                <>loading...</>
                :
                <div className="row">

                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-grid">
                        <button className='btn btn-primary mb-1' onClick={passwordHandler}>Update</button><span> </span>

                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-grid">

                        <button className='btn btn-outline-primary mb-1' onClick={() => editPass(false)}>Cancel</button>
                    </div>

                </div >
            }

        </div>
    )
}

export default withConnect(AccountPassword)