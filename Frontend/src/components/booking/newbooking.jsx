import React, { Component } from 'react';
import { Button } from 'primereact/button';


class Newbooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeVerify: ''
        };

    }

    generateCode() {
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        for (let i = 0; i < 6; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
    }

    setCode(){
        this.setState({ codeVerify: this.generateCode() });
    }

    setRedirect(){
        this.bookingStart();
    }

    bookingStart() {
        alert('Proceso terminado, que bonito');
        //aqui debe registrar el codigo en la base de datos
        window.location.href = '/';
    }

    componentDidMount() {
        this.setCode();
    }

    render() {
        return (
            <div>
                <div className='flex align-items-center justify-content-center my-8'>
                    <div className='align-items-center justify-content-center'>
                        <div className='gray-color py-8 px-5 sm:px-8 rounded'>
                            <h4 className='text-900 text-3xl font-medium text-center'>¡Felicitaciones!</h4><hr />
                            <p className="text-600 font-medium text-center">Su reservación ha sido existosa, comuniquese con el hotel<br/>
                                si desea hacer alguna modificación en su reserva o su cancelación.</p>
                            <div className='card'>
                                <div className='formgrid grid'>
                                    <div className='field col-12 text-center '>
                                        <label className="block text-900 font-medium mb-2">Tel: 999 - 999 - 9999</label>
                                    </div>
                                    <div className='field col-12 text-center '>
                                        <label className="block text-500 mb-2">Será redirigido a la pagina principal del hotel.</label>
                                    </div>
                                </div>
                                <div className='formgrid grid justify-content-end'>
                                    <div className='field'>
                                        <Button label="Terminar" icon="pi pi-check" onClick={this.bookingStart} className="p-button-success mx-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Newbooking;