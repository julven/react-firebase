import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JSXRoutings = ({ }) => {

    let navigate = useNavigate()
    let location = useLocation()
    let [linkNow, setLinkNow] = useState("")

    let linkHandler = (link) => {

        // console.log(location)
        navigate(link)
    }

    useLayoutEffect(() => {
        // console.log(location.pathname)
        if (location.pathname === "/") return setLinkNow("home")
        if (location.pathname.includes("list")) return setLinkNow("list")
        if (location.pathname.includes("account")) return setLinkNow("account")

    }, [location.pathname])

    return (

        <div className="" onClick={e => e.preventDefault()}>
            <ul className="nav nav-tabs justify-content-center mb-4 mt-1">
                <li className="nav-item">
                    <a className={"nav-link " + (linkNow === "home" ? "active fw-bold" : "")} href="/"


                        onBlur={e => e.target.className = "nav-link"}
                        onClick={e => linkHandler("/")}>Home</a>
                </li>
                <li className="nav-item">
                    <a


                        onBlur={e => e.target.className = "nav-link"}
                        onClick={e => linkHandler("/list")}
                        className={"nav-link " + (linkNow === "list" ? "active fw-bold" : "")} href="/list">List</a>
                </li>
                <li className="nav-item">
                    <a


                        onBlur={e => e.target.className = "nav-link"}
                        onClick={e => linkHandler("/account")}
                        className={"nav-link " + (linkNow === "account" ? "active fw-bold" : "")} href="/account">Account</a>
                </li>

            </ul>
        </div>
    )
}

export default JSXRoutings