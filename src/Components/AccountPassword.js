import React, { useState } from "react";
import { AUTH } from "./Firebase";
import withConnect from "./ReduxMap";

const AccountPassword = ({reduxAccountStates, reduxAccountSetter, editPass}) => {

    let [field, setField] = useState ({
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

        if(!checkValid.length) {
            setField({new: "", conf: ""})
            alert("must be atleast 4 characters long")
            setLoading(false)
            return
        }

        if(!checkValid.match) {
            setField({new: "", conf: ""})
            alert("new and confirm did not match!")
            setLoading(false)
            return
        }

        AUTH.changePass(field.new).then(resp => {
            if(resp) {
                alert("password changed successfully")
                editPass(false)
                setLoading(false)
                return
            }
            setLoading(false)
            alert("something went wrong!")
            AUTH.logout().then( resp => {
                if(resp) reduxAccountSetter.setLogged(false)
            });

        })
    }
    
    let fieldHandler = (e, fields) => {

        setField({
            ...field,
            [ fields ] : e.target.value
        })
    }

    return (
        <>
            <h3>Change Password</h3>
            <table>
                <tbody>
                    <tr>
                        <td>New Password</td>
                        <td><input type="password" value={field.new} onChange={e => fieldHandler(e, "new")}/></td>
                    </tr>
                    <tr>
                        <td>Confirm </td>
                        <td><input type="password" value={field.conf} onChange={e => fieldHandler(e, "conf")}/></td>
                    </tr>
                </tbody>
            </table>

            { loading ? 
            <>loading...</>
            :
            <>
                <button onClick={passwordHandler}>Update</button><span> </span>
                <button onClick={() => editPass(false)}>Cancel</button>
            </>
            }
            
        </>
    )
}

export default withConnect (AccountPassword)