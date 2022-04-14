import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountForm from './AccountForm';
import { AUTH, DB, STORAGE } from './Firebase';
import withConnect from './ReduxMap';


const Register = ({reduxAccountSetter}) => {
    let [load, setLoad] = useState(false);
    let imgPrev = useRef(null)
    let field = {
        email: useRef(null),
        fname: useRef(null),
        lname: useRef(null),
        bday: useRef(null),
        image: useRef(null),
        password: useRef(null),
        confirm: useRef(null)
    }
    let navigate = useNavigate();

    let uploadHandler = e => {
        // console.log(field.image.current.files[0])
        if (field.image.current.files[0]) {
            imgPrev.current.src = URL.createObjectURL(field.image.current.files[0])
        }
        else imgPrev.current.src = ""

    }

    let submitHandler = () => {
        // console.log(field)
        // return ;
        let error = false;
        let checkField = { ...field }
        let fieldData = {}
        delete checkField.image
        Object.keys(checkField).forEach(e => {
            // console.log(e)

            if (checkField[e].current.value === "") {
                error = true;

            }
            fieldData = { ...fieldData, [e]: checkField[e].current.value }

        })

        if (error) {
            alert("all fields must not be empty!")
            return;
        }
        if (!field.image.current.files[0]) {
            alert("must have uploaded an image!")
            return;
        } else fieldData = { ...fieldData, image: field.image.current.files[0] }

        let emailCheck = field.email.current.value;
        let valid = {
            atSign: emailCheck.includes("@"),
            atSignStart: emailCheck[0] !== "@",
            atSignEnd: emailCheck[emailCheck.length - 5] !== "@",
            dotCom: emailCheck.substring(emailCheck.length - 4, emailCheck.length) === ".com"

        }
        if (!valid.atSign || !valid.atSignStart || !valid.atSignEnd || !valid.dotCom) {
            alert("email is invalid!")
            return
        }

        let clearPassConf = () => {
            field.confirm.current.value = "";
            field.password.current.value = "";
        }

        if (fieldData.password !== fieldData.confirm) {

            alert("password and confirm did not match!")
            clearPassConf()
            return;
        }

        if (fieldData.password.length <= 4) {
            alert("password must be atleast 4 characters long!")
            clearPassConf()
            return
        }

        // console.log(valid)


        setLoad(true);
        AUTH.register(fieldData).then(resp => {
            // console.log(resp.uid)
            STORAGE.upload(fieldData.image).then(urlLink => {
                // console.log(urlLink)
                fieldData.image = urlLink
                delete fieldData.confirm
                DB.create("user", fieldData, resp.uid).then(() => {
                    setLoad(false)
                    reduxAccountSetter.setAccount(fieldData)
                    reduxAccountSetter.setLogged(true)
                    
                    navigate("/account")
                    alert("registration success!")

                })

            })
        })

        // console.log({fieldData})

    }

    return (
        <>
            <h2>Register</h2>

            <img src='' ref={imgPrev} style={{ height: 80, width: 80, border: "1px solid black" }} /><br />
            <input type="file" accept='image/png, image/jpeg' ref={field.image} hidden onChange={uploadHandler} />
            <button onClick={() => field.image.current.click()}>upload</button>

            <AccountForm field={field}/>
            
            {load ?
                <p>loading...</p>
                :
                <>
                    <button onClick={submitHandler}>Submit</button><span> </span>
                    <button onClick={() => navigate("/login")}>Cancel</button>
                </>

            }

        </>
    )
}

export default withConnect (Register);