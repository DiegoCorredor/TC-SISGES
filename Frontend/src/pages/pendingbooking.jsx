import React, { Component } from 'react';
import Navgeneral from '../components/header/nav_general.jsx';
import Navsecondary from '../components/header2/nav_secondary2.jsx';
import Body from '../components/booking/newbooking3.jsx';
import Footer from '../components/footer/footer.jsx';

class pendingbooking extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Navgeneral/>
                <Navsecondary/>
                <Body/>
                <Footer/>
            </div>
        );
    }
}
 
export default pendingbooking;