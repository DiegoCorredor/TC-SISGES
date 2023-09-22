import React, { Component } from 'react';
import Navgeneral from '../components/header/nav_general.jsx';
import Navsecondary from '../components/header2/nav_secondary2.jsx';
import Body from '../components/booking/newbooking2.jsx';
import Footer from '../components/footer/footer.jsx';

class failbooking extends Component {
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
 
export default failbooking;