import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import Swal from 'sweetalert2';

class editbooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeService: '',
            typeBooking: '',
            countBeds: '',
            dateStart: '',
            dateEnd: '',
            nameClient: '',
            dniClient: '',
            phoneClient: '',
            mailClient: '',
            countChilds: '',
            countAdults: '',
            stateBooking: '',
            observations: '',
            optionsTypeService: [],
            optionsTypeBooking: [],
            optionsstateBooking: [],
            optionsSearch: [],
            optionSelected: '',
            URL: 'http://localhost:4000/'
        }
    }

    getBookings(){
        axios.get(this.state.URL+'booking').then(res => {
            this.setState({ optionsSearch: res.data.data })
        });
    }

    getElement(id){
        axios.get(this.state.URL+'booking/'+id).then(res => {
            this.setState({ ...res.data.data })
        });
    }

    getTypeService() {
        axios.get(this.state.URL+'dropdowns/typeService').then(res => {
            this.setState({ optionsTypeService: res.data.data })
        });
    }

    getstateBooking(){
        axios.get(this.state.URL+'dropdowns/statuses').then(res => {
            this.setState({ optionsstateBooking: res.data.data })
        });
    }

    getTypeBooking() {
        axios.get(this.state.URL+'dropdowns/typeBooking').then(res => {
            this.setState({ optionsTypeBooking: res.data.data })
        });
    }

    onOptionSelect(e){
        this.setState({optionSelected: e.target.value}); 
        this.getElement(e.target.value);
    }

    refresh() {
        this.setState({
            typeService: '',
            typeBooking: '',
            countBeds: '',
            dateStart: '',
            dateEnd: '',
            nameClient: '',
            dniClient: '',
            phoneClient: '',
            mailClient: '',
            countChilds: '',
            countAdults: '',
            stateBooking: '',
            observations: '',
        })
    }

    update(){
        axios.put(this.state.URL+'booking/'+this.state.optionSelected,{
            typeService: this.state.typeService,
            typeBooking: this.state.typeBooking,
            countBeds: parseInt(this.state.countBeds),
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            nameClient: this.state.nameClient,
            dniClient: this.state.dniClient,
            phoneClient: this.state.phoneClient,
            mailClient: this.state.mailClient,
            countChilds: parseInt(this.state.countChilds),
            countAdults: parseInt(this.state.countAdults),
            stateBooking: this.state.stateBooking,
            observations: this.state.observations,

        }).then(res => { 
            Swal.fire({
                title: 'Todo salió bien 😎',
                text: '¡Reserva actualizada con éxito!',
                icon: 'success',
                confirmButtonText: 'Volver atrás'
              }) 
            this.refresh(); 
            this.props.navigate('/dashboard')
        })
        .catch(err => {
            Swal.fire({
                title: 'Algo salió mal 😕',
                text: '¡No se pudo actualizar la reserva!',
                icon: 'error',
                confirmButtonText: 'Volver atrás'
              })
        });
    }

    componentDidMount(){
        this.getTypeService();
        this.getTypeBooking();
        this.getBookings();
        this.getstateBooking();
    }

    render(){
        return(
            <div className='card max-w-screen'>
                <div className=' align-items-center justify-content-start'>
                    <div className='align-items-center justify-content-center'>
                        <div className='py-2 px-5 sm:px-8 rounded'>
                        <h3 className='mx-2 px-2'>Editar una reservación</h3><hr/>
                            <div className='card'>
                                <div className='formgrid grid surface-100 border-round'>
                                    <div className='field col'>
                                        <label className="text-900 font-medium mb-2">Seleccione la reserva para modificarla</label>
                                        <Dropdown className='w-full' value={this.state.optionSelected} optionLabel='nameClient' optionValue='idbooking' options={this.state.optionsSearch} onChange={(e)=>this.onOptionSelect(e)} placeholder="Elija el árticulo a modificar"/>
                                    </div>
                                </div><hr/>
                                <div className='formgrid grid'>
                                    <div className='field col-5'>
                                        <label className="block text-900 font-medium mb-2">Tipo de servicio</label>
                                        <Dropdown className='w-full' value={this.state.typeService} options={this.state.optionsTypeService} onChange={(e) => { this.setState({ typeService: e.target.value });}} optionLabel='service' optionValue='idservice' placeholder="Elija el tipo de servicio" required />
                                    </div>
                                    <div className='field col-5'>
                                        <label className="block text-900 font-medium mb-2">Tipo de reservación</label>
                                        <Dropdown className='w-full' value={this.state.typeBooking} options={this.state.optionsTypeBooking} onChange={(e) => { this.setState({ typeBooking: e.target.value });}} optionLabel='booking' optionValue='idbooking' placeholder="Elija el tipo de reservación" required />
                                    </div>
                                    <div className='field col-2'>
                                        <label className="block text-900 font-medium mb-2">Cantidad de camas</label>
                                        <InputText className='w-full' value={this.state.countBeds} onChange={(e) => { this.setState({ countBeds: e.target.value }) }} type="number" placeholder="00" required />
                                    </div>
                                </div>
                                <div className='formgrid grid'>
                                    <div className='field col-3'>
                                        <label className="block text-900 font-medium mb-2">Fecha inicial</label>
                                        <Calendar className="w-full" value={this.state.dateStart} onChange={(e) => this.setState({ dateStart: e.target.value })} />
                                    </div>
                                    <div className='field col-3'>
                                        <label className="block text-900 font-medium mb-2">Fecha final</label>
                                        <Calendar className="w-full" value={this.state.dateEnd} onChange={(e) => this.setState({ dateEnd: e.value })} />
                                    </div>
                                    <div className='field col-6'>
                                        <label className="block text-900 font-medium mb-2">Nombre cliente</label>
                                        <InputText className='w-full' value={this.state.nameClient} onChange={(e) => { this.setState({ nameClient: e.target.value }) }} type="text" placeholder="Ingrese su nombre" required />
                                    </div>
                                </div>
                                <div className='formgrid grid'>
                                    <div className='field col-3'>
                                        <label className="block text-900 font-medium mb-2">Cedula</label>
                                        <InputText className='w-full' value={this.state.dniClient} onChange={(e) => { this.setState({ dniClient: e.target.value }) }} type="number" placeholder="99999999" required />
                                    </div>
                                    <div className='field col-3'>
                                        <label className="block text-900 font-medium mb-2">Telefono</label>
                                        <InputText className='w-full' value={this.state.phoneClient} onChange={(e) => { this.setState({ phoneClient: e.target.value }) }} type="number" placeholder="321 123 1234" required />
                                    </div>
                                    <div className='field col-6'>
                                        <label className="block text-900 font-medium mb-2">Email</label>
                                        <InputText className='w-full' value={this.state.mailClient} onChange={(e) => { this.setState({ mailClient: e.target.value }) }} type="email" placeholder="correo@correo.com" required />
                                    </div>
                                </div>
                                <div className='formgrid grid'>
                                    <div className='field col-2'>
                                        <label className="block text-900 font-medium mb-2"># de niños</label>
                                        <InputText className='w-full' value={this.state.countChilds} onChange={(e) => { this.setState({ countChilds: e.target.value }) }} type="number" placeholder="00" required />
                                    </div>
                                    <div className='field col-2'>
                                        <label className="block text-900 font-medium mb-2"># de adultos</label>
                                        <InputText className='w-full' value={this.state.countAdults} onChange={(e) => { this.setState({ countAdults: e.target.value }) }} type="number" placeholder="00" required />
                                    </div>
                                    <div className='field col-2'>
                                    <label className="block text-900 font-medium mb-2">Estado de reservación</label>
                                        <Dropdown className='w-full' value={this.state.stateBooking} options={this.state.optionsstateBooking} onChange={(e) => { this.setState({ stateBooking: e.target.value });}} optionLabel='status' optionValue='idstatus' placeholder="Elija el estado de la reservación" required />
                                    </div>
                                    <div className='field col-6'>
                                        <label className="block text-900 font-medium mb-2">Observaciones</label>
                                        <InputTextarea className='w-full' value={this.state.observations} onChange={(e) => { this.setState({ observations: e.target.value }) }} rows={5} cols={30} />
                                    </div>
                                </div>
                                <div className='formgrid grid justify-content-end'>
                                    <div className='field'>
                                    <Button label="Limpiar" onClick={(e)=>{this.refresh()}} type='reset' icon="pi pi-eraser" className="p-button-danger mx-1" />
                                        <Button label="Actualizar" onClick={(e)=>{this.update()}} icon="pi pi-save" className="p-button-success mx-1" />
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

export default editbooking;