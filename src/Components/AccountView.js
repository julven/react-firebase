import React from 'react'
import withConnect from './ReduxMap'

const AccountView = ({ reduxAccountStates, edit, editPass }) => {

    let { fname, lname, bday, logged, email, image, sex, role } = reduxAccountStates;

    return (
        <>
        <table>
                <tbody>
                    <tr>
                        <th>first Name</th>
                        <td>{fname}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>{lname}</td>
                    </tr>
                    <tr>
                        <th>Birthday</th>
                        <td>{bday}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>******</td>
                    </tr>

                </tbody>
            </table>
            
        
            <button onClick={() => edit(true)}>Edit Info</button><span> </span>
            <button onClick={() => editPass(true)}>Change Password</button>
        </>
    )
}

export default withConnect(AccountView) 