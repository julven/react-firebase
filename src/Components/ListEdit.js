import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DB, STORAGE } from './Firebase';
import Form from './Form';
import withConnect from './ReduxMap';
import { ServiceContext } from './ServiceContext';

const ListEdit = ({ reduxListStates, reduxListSetter }) => {

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
    let [load,setLoad] = useState(true)

    useEffect(() => {
        
        // let found = false
        // reduxListStates.list.forEach( e => {
        //     if(e.id === param.id) {
        //         // console.log(e)
        //         setFields({
        //             ...fields,
        //             ...e
        //         })
        //         imgPrev.current.src = e.image
        //         found = true
        //         return
        //     }
        // })
        // if(!found) navigate("/list")

        DB.readOne("person", param.id).then(resp => {

            // return console.log(resp)

            if (resp !== false) {
                let newFields = {
                    id: param.id,
                    ...resp
                }

                setFields(newFields)
                setLoad(false)
                return 
            }
            return navigate("/list", {replace: true})
        })
    }, [])

    let submitHandler = () => {
        setLoading(true)
        // console.log({fields})
        let valid = context.fieldValid(fields)
        // console.log(valid)
        if (!valid){
            setLoading(false)
            return alert("all fields must not be empty!");
        } 

        DB.update(fields.id, fields, "person").then((resp) => {
            // console.log(fields)
            if(!resp) return alert("something went wrong!")

            reduxListSetter.editInfo(fields)
            alert("Person info successfully updated!")
            setLoading(false)
        })
    }

    let uploadHandler = (e) => {
        setLoading(true)
        if (imgUpload.current.files[0]) {
            STORAGE.upload(imgUpload.current.files[0]).then(url => {
                // console.log({newUrl: url})

                STORAGE.deletes(fields.image)
                DB.update(fields.id, { image: url }, "person")
                // setFields({...fields, image: url})
                reduxListSetter.editInfo({ ...fields, image: url })


                alert("Image successfully updated!")
                setLoading(false)


            })
        }
    }

    if(load) return <>loading...</>

    return (
        <>
            <div className='row justify-content-center'>

                <div className='col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4'>
                    <div className="card">
                        <div className="card-body">
                            <p className='fs-1 '>Edit Person</p>
                            <div className='text-center'>

                                {/* List Edit
            <button onClick={() => navigate("/list")}>Back</button> */}
                                <img
                                    src={fields.image}
                                    ref={imgPrev}
                                    style={{ width: 90, height: 90, border: "1px solid  "+(fields.image===""? "red":'gray')  }} /><br />
                                <input 
                                
                                type="file" ref={imgUpload} onChange={uploadHandler} hidden />
                                {loading ? <>loading...</> : 
                                <button 
                                className='btn btn-outline-primary btn-sm my-2' 
                                style={{width: 90}}
                                onClick={() => imgUpload.current.click()}>Change</button>
                                }

                            </div>

                            <Form fields={fields} setFields={setFields} loading={loading} submitHandler={submitHandler} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default withConnect(ListEdit);