import React, { useContext, useEffect, useRef, useState } from 'react';
import AccountEdit from './AccountEdit';
import AccountPassword from './AccountPassword';
import AccountView from './AccountView';
import { AUTH, DB, STORAGE } from './Firebase';
import withConnect from './ReduxMap';
import { ServiceContext } from './ServiceContext';

const Account = ({ reduxAccountStates, reduxAccountSetter }) => {

    let imgField = useRef(null)
    let imgPrev = useRef(null)
    let context = useContext(ServiceContext)
    let { image } = reduxAccountStates;
    let [editInfo, setEditInfo] = useState(false);
    let [editPass, setEditPass] = useState(false)
    let [loading, setLoading] = useState(false)
    
    useEffect(() => {
        // console.log(reduxAccountStates)
        context.log("useEffect Account")
    }, [reduxAccountStates])
    
    let imageHandler = async (e) => {
        

        if(imgField.current.files[0]) {
            setLoading(true)
            STORAGE.upload(imgField.current.files[0]).then(async resp => {

                let user = await AUTH.init();             
                // console.log(user.uid)
                // return

                if(reduxAccountStates.image) await STORAGE.deletes(reduxAccountStates.image)
                await DB.update(user.uid, {image: resp}, "user")
                reduxAccountSetter.setAccount({image: resp})
                setLoading(false)
                alert("image successfully updated!")
            })
            
        }
    }

    return (
        <>
            <h2>Account</h2>

            <img
            ref={imgPrev}   
            src={image}
            style={{ height: 80, width: 80, border: "1px solid black" }}></img><br />
            <input type="file" hidden ref={imgField} onChange={imageHandler}/>
            {!(editInfo || editPass) && <button onClick={() => imgField.current.click()} disabled={loading}>Change</button>}
           
           { editPass ? 
            <>
               <AccountPassword  editPass={setEditPass}/>
            </>
           :
            <>
                { editInfo ?
                <AccountEdit edit={setEditInfo}/>
                :
                <AccountView edit={setEditInfo}  editPass={setEditPass}/>
                }
            </>
            }
        </>
    )
}

export default withConnect(Account);