import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB, STORAGE } from './Firebase';

import Form from './Form';
import withConnect from './ReduxMap';
import { ServiceContext } from './ServiceContext';

const ListAdd = ({ reduxListSetter, reduxListStates }) => {

    let navigate = useNavigate()
    let context = useContext(ServiceContext)
    let imgUpload = useRef(null)
    let imgPrev = useRef(null)
    let [fields, setFields] = useState({
        fname: '',
        lname: '',
        bday: '',
        gender: '',
        image: '',
    })
    let [loading, setLoading] = useState(false)

    let imageHandler = () => {

        if (imgUpload.current.files[0]) {

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
        if (!context.fieldValid(fields)) {
            alert("all fields must not be empty!")
            setLoading(false)
            return;
        }
        STORAGE.upload(fields.image).then(url => {

            if (url === false) {
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

            DB.create("person", fieldCopy, null).then(resp => {
                if (resp === false) {
                    setLoading(false)
                    alert("something went wrong: database failed")
                    return
                }

                // console.log({person: resp.id})



                reduxListSetter.addInfo({ ...fieldCopy, id: resp.id })
                // let listPages = Math.ceil(reduxListStates.list.length / reduxListStates.limit)
                // console.log({listPages, reduxListStates})
                // reduxListSetter.setList({pages: listPages})


                let conf = window.confirm("person successfully added, view now?")
                if (conf) navigate("/listview/" + resp.id)


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
            <div className='row justify-content-center'>

                <div className='col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4'>
                    <div className="card">
                        <div className="card-body">
                            <p className='fs-1 '>Add Person</p>
                            <div className='text-center'>
                                <img
                                    src=""
                                    ref={imgPrev}
                                    style={{ width: 90, height: 90, border: "1px solid "+(fields.image===""? "red":'gray') }} /><br />
                                <input type="file" accept='image/png, image/jpeg' hidden ref={imgUpload} onChange={imageHandler} />
                                {loading ? 
                                <>loading...</> : 
                                <button 
                                className='btn btn-outline-primary mt-1 btn-sm mb-2'
                                style={{width: 90}}
                                onClick={() => imgUpload.current.click()}>Upload</button>}
                            </div>

                            <Form
                                fields={fields}
                                setFields={setFields}
                                submitHandler={submitHandler}
                                loading={loading}
                                setLoading={setLoading} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withConnect(ListAdd);