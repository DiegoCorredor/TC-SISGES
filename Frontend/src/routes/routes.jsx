import {createBrowserRouter} from 'react-router-dom';
import React from 'react';
import Landing from '../pages/landing.jsx';
import Login from '../pages/login.jsx';
import Booking from '../pages/booking.jsx';
import Error404 from '../pages/error404.jsx';
import Dashboard from '../pages/dashboard.jsx';
import AddelementNavigate from '../pages/addelement.jsx';
import Searchelement from '../pages/searchelement.jsx';
import Editelement from '../pages/editelement.jsx';
import Delelement from '../pages/delelement.jsx';
import AddbookingNavigate from '../pages/addbooking.jsx';
import Searchbooking from '../pages/searchbooking.jsx';
import Editbooking from '../pages/editbooking.jsx';
import Deletebooking from '../pages/deletebooking.jsx';
import NewBooking from '../pages/newbooking.jsx';
import Failbooking from '../pages/failbooking.jsx';
import Pendingbooking from '../pages/pendingbooking.jsx';
import Addbilling from '../pages/addbilling.jsx';
import Searchbilling from '../pages/searchbilling.jsx';
import Editbilling from '../pages/editbilling.jsx';
import Deletebilling from '../pages/delbilling.jsx';
import Searchcodes from '../pages/searchcodes.jsx';

export default createBrowserRouter([
    {
        path: '/',
        element: <Landing/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/booking',
        element: <Booking/>
    },
    {
        path: '*',
        element: <Error404/>

    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    },
    {
        path:'/addelement',
        element: <AddelementNavigate/>
    },
    {
        path:'/searchelement',
        element: <Searchelement/>
    },
    {
        path:'/editelement',
        element: <Editelement/>
    },
    {
        path:'/delelement',
        element: <Delelement/>
    },
    {
        path:'/addbooking',
        element: <AddbookingNavigate/>
    },
    {
        path:'/searchbooking',
        element: <Searchbooking/>
    },
    {
        path:'/editbooking',
        element: <Editbooking/>
    },
    {
        path:'/deletebooking',
        element: <Deletebooking/>
    },
    {
        path:'/bookingNew',
        element: <NewBooking/>
    },
    {
        path:'/failbooking',
        element: <Failbooking/>
    },
    {
        path:'/pendingbooking',
        element: <Pendingbooking/>
    },
    {
        path:'/addbilling',
        element: <Addbilling/>
    },
    {
        path:'/searchbilling',
        element: <Searchbilling/>
    },
    {
        path:'/editbilling',
        element: <Editbilling/>
    },
    {
        path:'/deletebilling',
        element: <Deletebilling/>
    },
    {
        path:'/searchcodes',
        element: <Searchcodes/>
    }
]) 