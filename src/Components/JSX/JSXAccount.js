import React, { useState } from "react";
import AccountEdit from "../AccountEdit";
import AccountPassword from "../AccountPassword";
import AccountView from '../AccountView'
import { AUTH } from "../Firebase";
const JSXAccount = ({ parent }) => {

    let [imgLoad, setImgLoad] = useState (false)
    let {
        reduxAccountSetter,
        loading,
        imgPrev,
        image,
        imgField,
        imageHandler,
        editInfo,
        setEditInfo,
        editPass,
        setEditPass } = parent

    let logoutHandler = () => {
        AUTH.logout().then(resp => {
            if (resp) {
                reduxAccountSetter.setLogged(false)
                reduxAccountSetter.setAccount({
                    fname: "",
                    lname: "",
                    email: "",
                    password: "",
                    bday: "",
                    image: "",
                })
            }
        })
    }

    return (
        <>
            <div className='row justify-content-center'>

                <div className='col-11 col-sm-8 col-md-6 col-lg-5 '>
                    <div className="card">
                        <div className="card-body">
                            <p className='fs-1 '>Account</p>
                            <a href="#/login" onClick={() => logoutHandler()}>Logout</a>
                            <div className="text-center">

                                <div className="spinner-border my-4" role="status" hidden={imgLoad}></div>
                                <img
                                    hidden={!imgLoad}
                                    onLoad={() => setImgLoad(true)}
                                    alt={image}
                                    ref={imgPrev}
                                    src={image}
                                    style={{ height: 90, width: 90, border: "1px solid gray" }}></img><br />
                                <input type="file" hidden ref={imgField} onChange={imageHandler} />
                                {!(editInfo || editPass) &&

                                    <button
                                        style={{ width: 90 }} className="btn btn-sm btn-outline-primary mb-4 mt-1"
                                        onClick={() => imgField.current.click()} disabled={loading}>Change</button>
                                }
                                {editPass ?
                                    <><AccountPassword editPass={setEditPass} /></>
                                    :
                                    <>
                                        {editInfo ?
                                            <><AccountEdit edit={setEditInfo} /></>
                                            :
                                            <><AccountView edit={setEditInfo} editPass={setEditPass} /></>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JSXAccount;