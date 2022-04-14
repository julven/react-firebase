import React, { useEffect, useState } from 'react';
import { DB } from './Firebase';
import withConnect from './ReduxMap';

const Home = ({reduxAccountStates}) => {

    let [summary,setSummary] = useState ({
        male: 0,
        female: 0,
        total: 0,
    })

    useEffect(() => {
        // console.log("useEffect Home")
        let male = 0;
        let female = 0;
        let total = 0;
        DB.readAll().then(list => {
            // console.log({list})
            list.forEach( x => {
                if(x.gender === "female") female++;
                if(x.gender === "male") male++;
                total++
            }) 

            // console.log({male, female, total})

            setSummary({
                male,
                female,
                total
            })
        })
    }, [])

    return (
        <>
            <h2>Home</h2>
            <p>Welcome <b>{reduxAccountStates.fname}</b></p>
            <p><b>List Summary</b></p>
            <table>
                <tbody>
                    
                    <tr>
                        <td>Male :</td>
                        <th> {summary.male}</th>
                    </tr>
                    <tr>
                        <td>Female :</td>
                        <th> {summary.female}</th>
                    </tr>
                    <tr>
                        <td>Total :</td>
                        <th> {summary.total}</th>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default withConnect (Home);