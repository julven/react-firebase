import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB, STORAGE } from './Firebase';
import Form from './Form';
import withConnect from './ReduxMap';
import { ServiceContext } from './ServiceContext';

const ListEdit = ({reduxListStates, reduxListSetter}) => {

    let context = useContext(ServiceContext)
    let param = useParams()
    let navigate = useNavigate();
    let imgPrev = useRef(null);
    let imgUpload = useRef(null);
    let [fields, setFields] = useState({
        fname: "",
        lname: "",
        gender: "",
        image: "",
        bday: "",
        id: "",
    })
    let [loading, setLoading] = useState(false)
  
    useEffect(() => {
        let found = false
        reduxListStates.list.forEach( e => {
            if(e.id === param.id) {
                // console.log(e)
                setFields({
                    ...fields,
                    ...e
                })
                imgPrev.current.src = e.image
                found = true
                return
            }
        })
        if(!found) navigate("/list")
    }, [])

    let submitHandler = () => {
        setLoading(true)
        // console.log({fields})
        let valid = context.fieldValid(fields)
        // console.log(valid)
        if(!valid) return alert("all fields must not be empty!");

        DB.update(fields.id, fields, "person").then( () => {
            reduxListSetter.editInfo(fields)
            alert("Person info successfully updated!")
            setLoading(false)
        })
    }

    let uploadHandler = (e) => {
        setLoading(true)
        if(imgUpload.current.files[0]) {
            STORAGE.upload(imgUpload.current.files[0]).then( url => {
                // console.log({newUrl: url})
            
                STORAGE.deletes(fields.image)
                DB.update(fields.id, {image: url}, "person")
                // setFields({...fields, image: url})
                reduxListSetter.editInfo({...fields, image: url})
                
                
                alert("Image successfully updated!")
                setLoading(false)
                
                
            })
        }
    }
    return (
        <>
             <h2>Edit Info</h2>
            {/* List Edit
            <button onClick={() => navigate("/list")}>Back</button> */}
            <img
            src={fields.image}
            ref={imgPrev} 
            style={{width: 80, height: 80, border: "1px solid black"}}/><br/>
            <input type="file" ref={imgUpload} onChange={uploadHandler} hidden/>
            {loading ? <>loading...</>:<button onClick={() => imgUpload.current.click()}>Change</button>}
           
            <Form fields={fields} setFields={setFields} loading={loading} submitHandler={submitHandler}/>



        </>
    )
}

export default withConnect (ListEdit);