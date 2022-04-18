import moment from 'moment';
import React from 'react'
import withConnect from './ReduxMap'


const AccountView = ({ reduxAccountStates, edit, editPass }) => {

    let { fname, lname, bday, logged, email, image, sex, role } = reduxAccountStates;

    return (
        <>
        <table className='table table-borderless'>
                <tbody>
                    <tr>
                        <th className='text-end'>first Name</th>
                        <td className="text-capitalize">{fname}</td>
                    </tr>
                    <tr>
                        <th className='text-end'>Last Name</th>
                        <td className="text-capitalize">{lname}</td>
                    </tr>
                    <tr>
                        <th className='text-end'>Birthday</th>
                        <td className="text-capitalize">{moment(bday).format("MMMM D, YYYY")}</td>
                    </tr>
                    <tr>
                        <th className='text-end'>Email</th>
                        <td >{email}</td>
                    </tr>
                    <tr>
                        <th className='text-end'>Password</th>
                        <td>******</td>
                    </tr>

                </tbody>
            </table>
            
            <div className='row'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-6 d-grid'>
                <button className='btn btn-primary mb-1' onClick={() => edit(true)}>Edit Info</button>
                </div>
                <div className='col-12  col-sm-12 col-md-12 col-lg-6 d-grid'>
                <button className='btn btn-outline-primary    mb-1' onClick={() => editPass(true)}>Change Password</button>
                </div>

            </div>
      
           
        </>
    )
}

export default withConnect(AccountView) 