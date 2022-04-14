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
                if(resp) {
                    updateSuccess()
                    return
                }
                DB.create("user", data, id).then( resp => {
                    if(resp !== false) {
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
        <h3>Update Info</h3>
            <table>
                <tbody>
                    <tr>
                        <th>first Name</th>
                        <td><input type="text" value={field.fname} onChange={e => fieldChange(e, "fname")} /></td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td><input type="text" value={field.lname} onChange={e => fieldChange(e, "lname")} /></td>
                    </tr>
                    <tr>
                        <th>Birthday</th>
                        <td><input type="date" value={field.bday} onChange={e => fieldChange(e, "bday")} /></td>
                    </tr>


                </tbody>
            </table>
            {loading ? 
            <>loading...</>
            :
            <>
                <button onClick={updateHandler}>Update</button> <span> </span>
                <button onClick={() => edit(false)}>Cancel</button>
            </>

            }
            
        </>
    )
}

export default withConnect(AccountEdit)