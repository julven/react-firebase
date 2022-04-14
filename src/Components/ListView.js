import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DB } from "./Firebase";
import withConnect from "./ReduxMap";

const ListView = ({reduxListStates}) => {

    let param = useParams()
    let navigate = useNavigate()
    let editHandler = e => {

        navigate("/listedit/"+param.id)
    }
    let [fields, setFields] = useState({
        fname:"",
        lname: "",
        bday: "",
        image: "",
        id: "",
        gender: "",
    })

    useEffect(() => {
      
        DB.readOne("person", param.id).then( resp => {
            // console.log(resp)
            if(!resp) navigate("/list", {replace: true});
            setFields({...fields, ...resp})
          
        })
     
    },[])

    return (
        <>
            <h2>View Info</h2>
            <img
            src={fields.image}
            style={{width: 80, height: 80, border: "1px solid black"}}/><br/>
            
            <table>
                <tbody>
               
                    <tr>
                        <td>First Name</td>
                        <td><b>{fields.fname}</b></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td><b>{fields.lname}</b></td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td><b>{fields.bday}</b></td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td><b>{fields.gender}</b></td>
                    </tr>
                </tbody>
            </table>

            <button onClick={editHandler}>Edit</button> <span> </span>
            <button onClick={() => navigate(-1)}>Back</button>
        </>
    )

}


export default withConnect (ListView);