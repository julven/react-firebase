import React, { useEffect } from 'react'

const AccountForm = ({ field }) => {

    useEffect(() => {
        // console.log({ accountForm: field })
    }, [])

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="email" ref={field.email} />

                        </td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td><input ref={field.fname} /></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td><input ref={field.lname} /></td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td><input type="date" ref={field.bday} /></td>
                    </tr>

                    <tr>
                        <td>Password</td>
                        <td><input type="password" ref={field.password} /></td>
                    </tr>

                    <tr>
                        <td>Confirm</td>
                        <td><input type="password" ref={field.confirm} /></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default AccountForm