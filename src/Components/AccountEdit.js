import React, { useEffect, useState } from 'react'
import { AUTH, DB } from './Firebase'
import withConnect from './ReduxMap'

const AccountEdit = ({ reduxAccountSetter, reduxAccountStates, edit }) => {

    let [field, setField] = useState({
        fname: "",
        lname: "",
        bday: "",
    })

    let [loading, setLoading] = useState(false)

    useEffect(() => {
        setField({ ...reduxAccountStates })

    }, [])

    let fieldChange = (e, fieldName) => {
        setField({
            ...field,
            [fieldName]: e.target.value
        })
    }

    let updateHandler = () => {

        if (field.fname === "" || field.lname === "" || field.bday === "") {
            alert("all fields must not be empty!")
            return
        }
        setLoading(true)
        AUTH.init().then(resp => {
            let data = {
                fname: field.fname,
                lname: field.lname,
                bday: field.bday,
                email: resp.email,
            }
            let id = resp.uid
            // console.log(resp.email)
            // return

            let updateSuccess = () => {
                reduxAccountSetter.setAccount(data)
                alert("info update successful!")
                edit(false)
                setLoading(false)
            }

            DB.update(id, data, "user").then((resp) => {
                if (resp) {
                    updateSuccess()
                    return
                }
                DB.create("user", data, id).then(resp => {
                    if (resp !== false) {
                        updateSuccess()
                        return
                    }
                    alert("something went wrong!")
                    AUTH.logout();

                })

            })

        })

    }



    return (
        <>
            <p className='fs-4'>Update Info</p>
            <table className='table table-borderless'>
                <tbody>
                    <tr>
                        <th className="text-end d-none d-sm-block">first Name</th>
                        <td  className='text-start'>
                            <input
                                className='form-control '
                                type="text" value={field.fname} onChange={e => fieldChange(e, "fname")} />
                                <small className="d-block d-sm-none fw-bold">First Name</small>
                        </td>
                    </tr>
                    <tr>
                        <th className="text-end d-none d-sm-block">Last Name</th>
                        <td  className='text-start'>
                            <input
                                className='form-control '
                                type="text" value={field.lname} onChange={e => fieldChange(e, "lname")} />
                                <small className="d-block d-sm-none fw-bold">Last Name</small>
                        </td>
                    </tr>
                    <tr>
                        <th className="text-end d-none d-sm-block">Birthday</th>
                        <td  className='text-start'>
                            <input
                                className='form-control'
                                type="date" value={field.bday} onChange={e => fieldChange(e, "bday")} />
                                <small className="d-block d-sm-none fw-bold">Birthday</small>
                        </td>
                    </tr>


                </tbody>
            </table>
            {loading ?
                <>loading...</>
                :
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 d-grid'>
                        <button  className='btn btn-primary mb-1' onClick={updateHandler}>Update</button>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 d-grid'>
                        <button className='btn btn-outline-primary  mb-1' onClick={() => edit(false)}>Cancel</button>
                    </div>
                    <span> </span>

                </div>

            }

        </>
    )
}

export default withConnect(AccountEdit)