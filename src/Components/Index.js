import React, { useEffect } from 'react';
import Routings from './Routings';
import { BrowserRouter, HashRouter, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { reduxListContext, reduxListStore } from './ReduxList';
import { reduxAccountContext, reduxAccountStore } from './ReduxAccount';
import { ServiceProvider } from './ServiceContext';

const Index = () => {

    useEffect(() => {

    }, [])

    return (
        <>

            <Provider store={reduxListStore} context={reduxListContext}>
                <Provider store={reduxAccountStore} context={reduxAccountContext}>
                    <ServiceProvider>
                        <HashRouter>
                            <Routings />
                          
                        </HashRouter>
                    </ServiceProvider>
                </Provider>
            </Provider>

        </>
    )
}

export default Index