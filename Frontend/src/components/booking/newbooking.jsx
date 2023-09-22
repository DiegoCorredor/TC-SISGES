import React, { Component } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';

class Newbooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeVerify: '',
            nameClient: localStorage.getItem('nameClient'),
            emailClient: localStorage.getItem('mailClient'),
            dniClient: localStorage.getItem('client'),
            URL: 'http://localhost:4000/',
            URL2: 'http://localhost:5000/'
        };

    }

    generateCode() {
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        for (let i = 0; i < 6; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        this.setState({ codeVerify: codigo });
        this.setState({ nameClient: localStorage.getItem('nameClient') });
        this.setState({ emailClient: localStorage.getItem('mailClient') });
        this.setState({ dniClient: localStorage.getItem('client') });
    }

    async saveData() {
        alert('Su codigo de reserva es: ' + this.state.codeVerify);
        alert('Su codigo de reserva es: ' + this.state.nameClient);
        const person = localStorage.getItem('nameClient');
        const mail = localStorage.getItem('mailClient');
        const dni = localStorage.getItem('client');
        if (person) {
            this.setState({ nameClient: person });
            axios.post(this.state.URL + 'billings', {
                nameClient: this.state.nameClient,
                dateBilling: new Date(),
                productsBilling: 1,
                totalBilling: 30000,
                stateBilling: 6,
                descriptionBilling: 'Reserva con codigo: ' + this.state.codeVerify,
            });
            const data = { email: mail, code: this.state.codeVerify, name: this.state.nameClient };
            await axios.post(this.state.URL2 + 'mailer/sendMail', data)
                .then(async () => {
                    await axios.post(this.state.URL2 + 'saveCode', { code: this.state.codeVerify, dni: dni })
                        .then(() => {
                            console.log('codigo agregado')
                            localStorage.removeItem('nameClient');
                            localStorage.removeItem('mailClient');
                            localStorage.removeItem('client');
                            window.location.href = '/';
                        });
                });

        }
    }

    componentDidMount() {
        this.generateCode();
    }

    render() {
        return (
            <div>
                <div className='flex align-items-center justify-content-center my-8'>
                    <div className='align-items-center justify-content-center'>
                        <div className='gray-color py-8 px-5 sm:px-8 rounded'>
                            <h4 className='text-900 text-3xl font-medium text-center'>¡Felicitaciones!</h4><hr />
                            <p className="text-600 font-medium text-center">Su reservación ha sido existosa, comuniquese con el hotel<br />
                                si desea hacer alguna modificación en su reserva o su cancelación.</p>
                            <p className="text-900 text-center">Su codigo se mostrará a continuación:</p>
                            <p className="text-900 text-center text-3xl">{this.state.codeVerify}</p>
                            <p className="text-900 text-center">Recuerde hacer clic en terminar para enviar a su correo el código de seguridad.</p>
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
                                        <Button label="Terminar" icon="pi pi-check" onClick={() => this.saveData()} className="p-button-success mx-1" />
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