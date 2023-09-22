import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

class searchcode extends Component{
    constructor(props){
        super(props);
        this.state = {
            codeList: [],
            URL: 'http://localhost:5000/'
        }
    }

    componentDidMount(){
        axios.get(this.state.URL+'getCode').then(res => {
            this.setState({codeList: res.data.data});
        });
    }

    render() {
        const header = <label className="text-3xl">Resultado de la busqueda</label>;
        const footer = this.state.codeList.length + " elementos encontrados en total.";

        return (
            <div className='card max-w-screen'>
                <div className='align-items-center justify-content-start'>
                    <div className='align-items-center justify-content-center'>
                        <div className='py-2 px-5 sm:px-8 rounded'>
                            <h3 className='mx-2 px-2'>Consultar codigos de verificación</h3><hr />
                            <div className='card'>
                                
                                <DataTable value={this.state.codeList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} header={header} footer={footer} className='w-100 text-center'>
                                    <Column field="code" className='text-center' sortable header="Codigo"></Column>
                                    <Column field="user" className='text-center' sortable header="DNI cliente"></Column>
                                </DataTable>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default searchcode;
