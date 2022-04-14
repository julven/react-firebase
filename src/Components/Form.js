import React from 'react';
import { useNavigate } from 'react-router-dom';
import withConnect from './ReduxMap';

const Form = ({fields, setFields, reduxListSetter, submitHandler, setLoading, loading}) => {
    let navigate = useNavigate();

    let backHandler = (event) => {

        navigate(-1);
    }

    let fieldHandler = (e, field) => {
        setFields({
            ...fields,
            [field] : e.target.value
        })
    }

    let genderChecked = field => {
        if(fields.gender === field) return true;
        return false
    }


    return (

        <>
            <table>
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td><input type="text" value={fields.fname} onChange={ e => fieldHandler(e,"fname")}/></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td><input type="text"  value={fields.lname} onChange={ e => fieldHandler(e,"lname")}/></td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td><input type="date"  value={fields.bday} onChange={ e => fieldHandler(e,"bday")}/></td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>
                            <input
                            checked={genderChecked("male")}
                            type="radio" 
                            name="gender" 
                            value="male" 
                            onChange={ e => fieldHandler(e,"gender")}/>  Male <br />
                            <input
                            checked={genderChecked("female")}
                            type="radio" 
                            name="gender" 
                            value="female" 
                            onChange={ e => fieldHandler(e,"gender")}/> Female <br />
                        </td>
                    </tr>
                </tbody>
            </table>

            {loading ?
            <>loading...</>
            :
            <>
            <button onClick={submitHandler}>Submit</button><span> </span>
            <button onClick={backHandler}>Back</button>
            </>
            }
            

        </>
    )
}

export default withConnect (Form);