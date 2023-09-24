import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

class Addbilling extends Component {


    constructor(props) {
        super(props);
        this.state = {
            nameClient: '',
            dateBilling: '',
            productsBilling: 1,
            totalBilling: 30000,
            stateBilling: '',
            descriptionBilling: '',
            optionsStatusBilling: [],
            URL: 'http://localhost:4000/'
        }
    }

    getStatuses() {
        axios.get(this.state.URL + 'dropdowns/statuses').then(res => {
            this.setState({ optionsStatusBilling: res.data.data })
        });
    }

    refresh() {
        this.setState({
            nameClient: '',
            dateBilling: '',
            productsBilling: 1,
            totalBilling: 30000,
            stateBilling: '',
            descriptionBilling: '',
        })
    }

    saveBilling(){
        axios.post(this.state.URL+'billings', { nameClient: this.state.nameClient, dateBilling: this.state.dateBilling, productsBilling: parseInt(this.state.productsBilling), totalBilling: parseInt(this.state.totalBilling), stateBilling: this.state.stateBilling, descriptionBilling: this.state.descriptionBilling })
            .then(async res => { 
                await Swal.fire({
                    title: 'Todo salió bien 😎',
                    text: '¡Factura agregada!',
                    icon: 'success',
                    confirmButtonText: 'Volver atrás'
                  }) 
                  window.location.reload();
            })
            .catch(err => {
                Swal.fire({
                    title: 'Algo salió mal 😕',
                    text: '¡No se pudo agregar la factura!',
                    icon: 'error',
                    confirmButtonText: 'Volver atrás'
                  }) 
            });
    }

    componentDidMount() {
        this.getStatuses();
    }

    render() {
        return (
            <div className='card max-w-screen'>
                <div className=' align-items-center justify-content-start'>
                    <div className='align-items-center justify-content-center'>
                        <div className='py-2 px-5 sm:px-8 rounded'>
                            <h3 className='mx-2 px-2'>Agregar factura</h3><hr />
                            <div className='card'>
                                <div className='formgrid grid'>
                                    <div className='field col-5'>
                                        <label className="block text-900 font-medium mb-2">Nombre del cliente</label>
                                        <InputText className='w-full' value={this.state.nameClient} onChange={(e) => { this.setState({ nameClient: e.target.value }) }} placeholder="Nombre completo" required />
                                    </div>
                                    <div className='field col-3'>
                                        <label className="block text-900 font-medium mb-2">Fecha de facturación</label>
                                        <Calendar className="w-full" value={this.state.dateBilling} onChange={(e) => this.setState({ dateBilling: e.value })} />
                                    </div>
                                    <div className='field col-2'>
                                        <label className="block text-900 font-medium mb-2">Cantidad</label>
                                        <InputNumber disabled  className='w-full' value={this.state.productsBilling} onChange={(e) => { this.setState({ productsBilling: e.target.value }) }} min={'1'} max={'1'} placeholder="1" required />
                                    </div>
                                    <div className='field col-2'>
                                        <label className="block text-900 font-medium mb-2">Total</label>
                                        <InputNumber disabled  className='w-full' value={this.state.totalBilling} onChange={(e) => { this.setState({ totalBilling: e.target.value }) }} type="number" placeholder="30.000" required />
                                    </div>
                                </div>
                                <div className='formgrid grid'>
                                    <div className='field col-5'>
                                        <label className="block text-900 font-medium mb-2">Estado de la factura</label>
                                        <Dropdown className='w-full' value={this.state.stateBilling} options={this.state.optionsStatusBilling} onChange={(e) => { this.setState({ stateBilling: e.target.value }) }} placeholder="Elija el estado" optionLabel='status' optionValue='idstatus' required />
                                    </div>
                                    <div className='field col'>
                                        <label className="block text-900 font-medium mb-2">Descripción</label>
                                        <InputTextarea className='w-full' value={this.state.descriptionBilling} onChange={(e) => { this.setState({ descriptionBilling: e.target.value }) }} rows={5} cols={30} />
                                    </div>
                                </div>
                                <div className='formgrid grid justify-content-end'>
                                    <div className='field'>
                                        <Button label="Limpiar" icon="pi pi-eraser" onClick={() => this.refresh()} type='reset' className="p-button-danger mx-1" />
                                        <Button label="Guardar" icon="pi pi-save" onClick={() => this.saveBilling()} className="p-button-success mx-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function AddbillingNavigate() {
    const navigate = useNavigate();
    return <Addbilling navigate={navigate} />
}

export default AddbillingNavigate;