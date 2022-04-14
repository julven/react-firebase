import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB, STORAGE } from './Firebase';

import Form from './Form';
import withConnect from './ReduxMap';
import { ServiceContext } from './ServiceContext';

const ListAdd = ({reduxListSetter, reduxListStates}) => {

    let navigate = useNavigate()
    let context = useContext(ServiceContext)
    let imgUpload = useRef(null)
    let imgPrev = useRef(null)
    let [fields, setFields] = useState({
        fname:'',
        lname:'',
        bday:'',
        gender: '',
        image: '',
    })
    let [loading, setLoading] = useState(false)

    let imageHandler = () => {
        
        if(imgUpload.current.files[0]) {
            
            imgPrev.current.src = URL.createObjectURL(imgUpload.current.files[0])
            setFields({
                ...fields,
                image: imgUpload.current.files[0],
            })

        } else {
            imgPrev.current.src = ""
            setFields({
                ...fields,
                image: "",
            })
        }
    }

    let submitHandler = () => {
        setLoading(true)
        // console.log(fields)
        if(!context.fieldValid(fields)) {
            alert("all fields must not be empty!")
            setLoading(false)
            return;
        }
        STORAGE.upload(fields.image).then(url => {
            
            if(url === false) {
                alert("something went wrong: upload failed")
                setLoading(false)
                return
            }

           let fieldCopy = {
               ...fields,
               image: url
           }
        //    console.log(fieldCopy)
        //    return

            DB.create("person", fieldCopy, null).then( resp => {
                if(resp === false) {
                    setLoading(false)
                    alert("something went wrong: database failed")
                    return
                }
                
                // console.log({person: resp.id})
                
                
                
                reduxListSetter.addInfo({...fieldCopy, id: resp.id})
                // let listPages = Math.ceil(reduxListStates.list.length / reduxListStates.limit)
                // console.log({listPages, reduxListStates})
                // reduxListSetter.setList({pages: listPages})
                

                let conf = window.confirm("person successfully added, view now?")
                if(conf) navigate("/listview/"+resp.id)
                

                setFields({
                    fname: "",
                    lname: "",
                    bday: "",
                    image: "",
                    gender: "",
                })
                
                
                setLoading(false)

            })
        })

    }


    return (
        <>
            {/* List Add
            <button onClick={() => navigate("/list")}>Back</button> */}
            
            <h2>Add to List</h2>
            <img 
            src=""
            ref={imgPrev}
            style={{width: 80, height: 80, border: "1px solid black"}}/><br/>
            <input type="file" accept='image/png, image/jpeg' hidden ref={imgUpload} onChange={imageHandler}/>
            {loading ? <>loading...</>:<button onClick={() => imgUpload.current.click()}>Upload</button>}
            <Form 
            fields={fields} 
            setFields={setFields} 
            submitHandler={submitHandler} 
            loading={loading} 
            setLoading={setLoading}/>

            
        </>
    )
}

export default withConnect (ListAdd);