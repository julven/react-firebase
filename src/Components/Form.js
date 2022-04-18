import React from 'react';
import { useNavigate } from 'react-router-dom';
import withConnect from './ReduxMap';

const Form = ({ fields, setFields, reduxListSetter, submitHandler, setLoading, loading }) => {
    let navigate = useNavigate();

    let backHandler = (event) => {

        navigate(-1);
    }

    let fieldHandler = (e, field) => {
        setFields({
            ...fields,
            [field]: e.target.value
        })
    }

    let genderChecked = field => {
        if (fields.gender === field) return true;
        return false
    }


    return (

        <>
            <table className='table table-borderless'>
                <tbody>
                    <tr>
                        <td className="d-none  d-sm-none d-md-block" >First Name</td>
                        <td className='text-start'>
                            <input
                                className={"form-control "+(fields.fname === "" && " is-invalid")}
                                type="text" value={fields.fname} onChange={e => fieldHandler(e, "fname")} />
                            <small className="d-block d-sm-block d-md-none" >First Name</small>
                        </td>
                    </tr>
                    <tr>
                        <td className="d-none d-sm-none d-md-block" >Last Name</td>
                        <td className='text-start'>
                            <input
                                className={"form-control "+(fields.lname === "" && " is-invalid")}
                                type="text" value={fields.lname} onChange={e => fieldHandler(e, "lname")} />
                            <small className="d-block d-sm-block d-md-none">Last Name</small>
                        </td>
                    </tr>
                    <tr>
                        <td className="d-none d-sm-none d-md-block" >Birthday</td>
                        <td className='text-start'>
                            <input
                                 className={"form-control "+(fields.bday === "" && " is-invalid")}
                                type="date" value={fields.bday} onChange={e => fieldHandler(e, "bday")} />
                            <small className="d-block d-sm-block d-md-none">Birthday</small>
                        </td>
                    </tr>
                    <tr>
                        <td className="d-none d-sm-none d-md-block ">Gender</td>
                        <td >
                            <div className='d-flex'>
                                <small className="d-block d-sm-block d-md-none flex-fill w-25">Gender</small>
                                <div className='flex-fill w-75'>
                                    <input
                                        className={'form-check-input '+(fields.gender==="" && " is-invalid")}
                                        checked={genderChecked("male")}
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={e => fieldHandler(e, "gender")} />  Male <br />
                                    <input
                                     className={'form-check-input '+(fields.gender==="" && " is-invalid")}
                                        checked={genderChecked("female")}
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={e => fieldHandler(e, "gender")} /> Female <br />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {loading ?
                <>loading...</>
                :
                <>
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-6 d-grid'>
                            <button className='btn btn-primary mb-1' onClick={submitHandler}>Submit</button><span> </span>
                        </div>
                        <div  className='col-12 col-sm-12 col-md-12 col-lg-6 d-grid'>
                            <button className='btn btn-outline-primary mb-1' onClick={backHandler}>Back</button>
                        </div>
                    </div>


                </>
            }


        </>
    )
}

export default withConnect(Form);