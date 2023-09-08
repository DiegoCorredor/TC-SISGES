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
    }
]) 