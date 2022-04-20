import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import Account from "./Account";
import List from "./List";
import ListAdd from "./ListAdd";
import ListEdit from "./ListEdit";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ListView from "./ListView";
import withConnect from "./ReduxMap";
import { AUTH, DB } from './Firebase';
import { reduxAccountState } from "./ReduxAccount";
import { ServiceContext } from "./ServiceContext";
import JSXRoutings from "./JSX/JSXRoutings";

const Routings = ({ reduxAccountStates, reduxAccountSetter }) => {

    let context = useContext(ServiceContext)
    let location = useLocation();
    let navigate = useNavigate();
    let [load, setLoad] = useState(false)
    let [from, setFrom] = useState("/")
    let logoutHandler = e => {
        e.preventDefault()
        AUTH.logout().then(resp => {
            if (resp) {

                reduxAccountSetter.setAccount(reduxAccountState)
                reduxAccountSetter.setLogged(false)
            }
        })
    }
    useEffect(() => {
        // console.log(location)
        if(location.pathname !== "/login") setFrom(location.pathname)
    }, [])
    
    useEffect(() => {

        // console.log("useEffect Routings")
        setLoad(true)
        AUTH.init().then(resp => {
            // console.log( resp.uid )
            if (!resp) return setLoad(false);
            DB.readOne("user", resp.uid).then(async resp2 => {
                // console.log({location})
                if (!resp2) return setLoad(false);
                await reduxAccountSetter.setLogged(true)
                await reduxAccountSetter.setAccount(resp2)
                // navigate(location.pathname || "/", { replace: true })
                setLoad(false)
            })
            // DB.readAll().then( resp => console.log(resp))
            // DB.readLimit("person", 4).then(resp => {
            //     console.log(resp.list.length)
            //     DB.readBatch("person", resp.refDoc).then( resp => {
            //         console.log(resp.list.length)
            //     })
            // })

            // loopTest();
            // DB.readAll("person").then(resp => console.log(resp))

        })
    }, [])

    let loopTest = async () => {
        let list = []
        let refDoc = null
        for (let i = 0; i < 5; i++) {
            // console.log(list.length, refDoc)
            if (refDoc !== null) {

                await DB.readBatch("person", refDoc).then(resp => {
                    // console.log("has ref")
                    list = [...list, ...resp.list]

                    refDoc = resp.refDoc
                })
            }
            else if (refDoc === null) {

                await DB.readBatch("person").then(resp => {
                    // console.log("no ref")
                    // console.log({resp})
                    list = [...list, ...resp.list]

                    refDoc = resp.refDoc
                })
            }
        }
        // console.log(list)
    }

    const ProtectedRoute = ({ children }) => {

        if (!reduxAccountStates.logged) return <Navigate to="/login" state={{from: location}} replace />
        return children
    }
    const NotLoggedRoute = ({ children }) => {
        if (reduxAccountStates.logged) return <Navigate to={from} replace />;
        return children
    }

    const Layout = () => {

        return (
            <>
                {/* <ul>
                    {reduxAccountStates.logged &&
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/list">List</Link></li>
                            <li><Link to="/account">Account</Link></li>
                            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                        </>
                    }
                </ul> */}
                {reduxAccountStates.logged && <JSXRoutings />}
                <div className="container mb-5"><Outlet /></div>

            </>
        )
    }

    if (load) return (<>Loading...</>)

    return (
        <>
            <Routes>
                <Route element={<Layout />}>


                    <Route path="/" exact element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
                    <Route path="/list" exact element={<ProtectedRoute><List /></ProtectedRoute>}></Route>
                    <Route path="/list/:page" exact element={<ProtectedRoute><List /></ProtectedRoute>}></Route>
                    <Route path="/list/:page/search/:search" exact element={<ProtectedRoute><List /></ProtectedRoute>}></Route>
                    <Route path="/listadd" exact element={<ProtectedRoute><ListAdd /></ProtectedRoute>}></Route>
                    <Route path="/listedit/:id" exact element={<ProtectedRoute><ListEdit /></ProtectedRoute>}></Route>
                    <Route path="/listview/:id" exact element={<ProtectedRoute><ListView /></ProtectedRoute>}></Route>
                    <Route path="/account" exact element={<ProtectedRoute><Account /></ProtectedRoute>}></Route>
                    <Route path="/login" exact element={<NotLoggedRoute><Login /></NotLoggedRoute>} />
                    <Route path="/register" exact element={<NotLoggedRoute><Register /></NotLoggedRoute>} />
                    <Route path="/forgotpassword" exact element={<NotLoggedRoute><ForgotPassword /></NotLoggedRoute>} />
                    <Route path="*" exact element={<>Page does not exists</>}></Route>
                </Route>
            </Routes>

        </>
    )
}

export default withConnect(Routings);