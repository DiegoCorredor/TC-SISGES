import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

class Booking extends Component {
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
            observations: '',
            
            optionsTypeService: [],
            optionsTypeBooking: [],

        }
    }
    
    
    getTypeService() {
        axios.get('http://localhost:4000/dropdowns/typeService').then(res => {
            this.setState({ optionsTypeService: res.data.data })
        });
    }

    getTypeBooking() {
        axios.get('http://localhost:4000/dropdowns/typeBooking').then(res => {
            this.setState({ optionsTypeBooking: res.data.data })
        });
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
            observations: '',
        })
    }

    save() {
        axios.post('http://localhost:4000/booking', {
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
            observations: this.state.observations,
            stateBooking: 5
        }).then(res => {
            Swal.fire({
                title: '¡Perfecto! 😎',
                text: 'Estás a punto de terminar tu reservación, nos emociona mucho que nos hayas elegido.',
                icon: 'success',
                confirmButtonText: '¡Terminar reserva!'
              })
            alert(res.data.message); 
            this.props.navigate('/bookingNew')
        }).catch(err => {
            Swal.fire({
                title: 'Algo ha salido mal 🙁',
                text: 'Vuelve a intentarlo, revisa los datos que has ingresado. Si el problema persiste, contacta con el administrador y enviale el siguiente mensaje: (' + err.message + ')',
                icon: 'error',
                confirmButtonText: 'Volver a atrás'
              })
        });
    }

    componentDidMount() {
        this.getTypeService();
        this.getTypeBooking();
    }

    render() { 

        return (
            <div>
                <div className='flex align-items-center justify-content-center my-8'>
                    <div className='align-items-center justify-content-center'>
                        <div className='gray-color py-8 px-5 sm:px-8 rounded'>
                            <h4 className='text-900 text-3xl font-medium text-center'>Bienvenido</h4><hr/>
                            <p className="text-600 font-medium text-center">Rellene por favor el formulario para continuar con el proceso de reserva.</p>
                           <div className='card'>
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
                                        <Calendar className="w-full" value={this.state.dateStart} onChange={(e) => this.setState({ dateStart: e.value })} />
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
                                    <div className='field col-8'>
                                        <label className="block text-900 font-medium mb-2">Observaciones</label>
                                        <InputTextarea className='w-full' value={this.state.observations} onChange={(e) => { this.setState({ observations: e.target.value }) }} rows={5} cols={30} />
                                    </div>
                                </div>
                                <div className='formgrid grid justify-content-end'>
                                    <div className='field'>
                                        <Button label="Limpiar" onClick={(e)=>{this.refresh()}} type='reset' icon="pi pi-eraser" className="p-button-danger mx-1" />
                                        <Button label="Reservar" onClick={(e)=>{this.save()}} icon="pi pi-save" className="p-button-success mx-1" />
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
 
function BookingWithNavigate () {
    const navigate = useNavigate();
    return <Booking  navigate={navigate} />
}
 
export default BookingWithNavigate;