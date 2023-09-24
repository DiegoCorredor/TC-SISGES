import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Swal from 'sweetalert2';

class deletebilling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billingList: [],
            URL: 'http://localhost:4000/'
        }
    }

    delete(id) {
        axios.delete(this.state.URL+'billings/' + id)
        .then(async res => {
            await Swal.fire({
                title: 'Todo salió bien 😎',
                text: '¡Reserva eliminada con éxito!',
                icon: 'success',
                confirmButtonText: 'Volver atrás'
              })
            window.location.reload();
        })
        .catch(err => {
            Swal.fire({
                title: 'Algo salió mal 😕',
                text: '¡No se pudo eliminar la reserva!',
                icon: 'error',
                confirmButtonText: 'Volver atrás'
              })
        });

    }

    componentDidMount() {
        axios.get(this.state.URL+'billings').then(res => {
            this.setState({ billingList: res.data.data });
        });
    }

    render() {
        const header = <label className="text-3xl">Resultado de la busqueda</label>;
        const footer = this.state.billingList.length + " elementos encontrados en total.";
        const del = (rowData) => { return <Button label="Eliminar" className="p-button-danger" onClick={() => { this.delete(rowData.idbilling) }} /> }


        return (
            <div className='card max-w-screen'>
                <div className='align-items-center justify-content-start'>
                    <div className='align-items-center justify-content-center'>
                        <div className='py-2 px-5 sm:px-8 rounded'>
                            <h3 className='mx-2 px-2'>Eliminar factura</h3><hr />
                            <div className='card'>
                                <DataTable value={this.state.billingList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} header={header} footer={footer} className='w-100 text-center table-responsive'>
                                    <Column field="nameClient" className='text-center' sortable header="Nombre del cliente"></Column>
                                    <Column field="dateBilling" className='text-center' sortable header="Fecha"></Column>
                                    <Column field="productsBilling" className='text-center' sortable header="Productos"></Column>
                                    <Column field="totalBilling" className='text-center' sortable header="Total"></Column>
                                    <Column field="StatusModel.status" className='text-center' sortable header="Estado de la factura"></Column>
                                    <Column field="descriptionBilling" className='text-center' sortable header="Descripción"></Column>
                                    <Column filed="Acciones" className='text-center' header="Acciones" body={del}></Column>
                                </DataTable>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default deletebilling;