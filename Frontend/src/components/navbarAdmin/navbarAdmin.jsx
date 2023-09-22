import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import logo from '../../assets/logox.png';

class navbarAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameExist: false,
            nameUser: localStorage.getItem('name')
        }
    }

    updateLocal(){
        this.setState({nameUser: localStorage.getItem('name')})
    }

    verify(){
        const name = localStorage.getItem('name');
        if(name){
            this.setState({nameExist: true})
        } else {
            window.location.href = '/login';
        }
    }

    clean(){
        localStorage.clear();
        window.location.href = '/login';
    }

    componentDidMount(){
        this.verify();
        this.updateLocal();
    }

    render() {
        return (
            <nav className='brown-color'>
                <img alt="logo" src={logo} className="logo xl:mr-2 xl:ml-3 xl:my-2 lg:mr-2 lg:ml-3 lg:my-2 md:mr-2 md:ml-3 md:my-2 sm:mr-2 sm:ml-3 sm:my-2"/>
                <div className='rigth xl:mx-6 lg:mx-6 md:mx-6 sm:mx-6'>
                    <label className="text-white pr-5 text-xl"><i className="pi pi-users mr-1 text-xl"></i>{this.state.nameUser}
                    <Badge className='ml-1' value="" severity="success"/></label>
                        <Button icon='pi pi-sign-out' className='p-button-danger mr-3' onClick={this.clean}/>
                </div>
            </nav>
        );
    }
}
 
export default navbarAdmin;