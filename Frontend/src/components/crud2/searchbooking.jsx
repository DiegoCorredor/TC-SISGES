import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

class searchbooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingList: [],
            URL: 'http://localhost:4000/'
        }
    }

    componentDidMount(){
        axios.get(this.state.URL+'booking').then(res => {
            this.setState({bookingList: res.data.data}); 
        });
    }

    render() {

        
        const header = <label className="text-3xl">Resultado de la busqueda</label>;
        const footer = this.state.bookingList.length + " elementos encontrados en total.";

        return (
            <div className='card max-w-screen'>
                <div className='align-items-center justify-content-start'>
                    <div className='align-items-center justify-content-center'>
                        <div className='py-2 px-5 rounded'>
                            <h3 className='mx-2 px-2'>Consulta general de reservas</h3><hr />
                            <div className='card'>
                                
                                <DataTable value={this.state.bookingList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} header={header} footer={footer} className='w-100 text-center table-responsive'>
                                    <Column field="dniClient" className='text-center' sortable header="Cédula"></Column>
                                    <Column field="nameClient" className='text-center' sortable header="Nombre del cliente"></Column><Column field="nameClient" className='text-center' sortable header="Nombre del cliente"></Column>
                                    <Column field="phoneClient" className='text-center' sortable header="Teléfono del cliente"></Column>
                                    <Column field="mailClient" className='text-center' sortable header="Correo del cliente"></Column>
                                    <Column field="TypeServiceModel.service" className='text-center' sortable header="Tipo de servicio"></Column>
                                    <Column field="TypeBookingModel.booking" className='text-center' sortable header="Tipo de reserva"></Column>
                                    <Column field="countBeds" className='text-center' sortable header="Cantidad de camas"></Column>
                                    <Column field="dateStart" className='text-center' sortable header="Fecha de inicio"></Column>
                                    <Column field="dateEnd" className='text-center' sortable header="Fecha de fin"></Column>
                                    <Column field="countChilds" className='text-center' sortable header="Cantidad de niños"></Column>
                                    <Column field="countAdults" className='text-center' sortable header="Cantidad de adultos"></Column>
                                    <Column field="StatusModel.status" className='text-center' sortable header="Estado de la reserva"></Column>
                                    <Column field="observations" className='text-center' sortable header="Observaciones"></Column>
                                </DataTable>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default searchbooking;