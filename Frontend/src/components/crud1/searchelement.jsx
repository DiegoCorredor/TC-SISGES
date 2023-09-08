import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

class searchelement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: []
        }
    }

    componentDidMount(){
        axios.get('https://sgri--backend--zp5spsybyvz4.code.run/inventary').then(res => {
            this.setState({productList: res.data.data});
        });
    }

    render() {
        const header = <label className="text-3xl">Resultado de la busqueda</label>;
        const footer = this.state.productList.length + " elementos encontrados en total.";

        return (
            <div className='card max-w-screen'>
                <div className='align-items-center justify-content-start'>
                    <div className='align-items-center justify-content-center'>
                        <div className='py-2 px-5 sm:px-8 rounded'>
                            <h3 className='mx-2 px-2'>Consultar elementos del inventario</h3><hr />
                            <div className='card'>
                                
                                <DataTable value={this.state.productList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} header={header} footer={footer} className='w-100 text-center'>
                                    <Column field="nameElement" className='text-center' sortable header="Nombre"></Column>
                                    <Column field="TypeElementModel.typeElement" className='text-center' sortable header="Tipo"></Column>
                                    <Column field="countElement" className='text-center' sortable header="Cantidad"></Column>
                                    <Column field="StatusModel.status" className='text-center' sortable header="Estado"></Column>
                                    <Column field="valueElement" className='text-center' sortable header="Valor"></Column>
                                    <Column field="DependenciesModel.dependencyName" className='text-center' sortable header="Dependencia"></Column>
                                    <Column field="dateStart" className='text-center' sortable header="Fecha de inicio"></Column>
                                    <Column field="descriptionElement" className='text-center' sortable header="Descripción"></Column>
                                </DataTable>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default searchelement;