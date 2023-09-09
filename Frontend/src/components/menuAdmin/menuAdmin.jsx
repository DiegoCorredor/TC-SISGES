import React, { Component } from 'react';
import { Menu } from 'primereact/menu';

class menuAdmin extends Component {
    state = {}

    constructor(props) {
        super(props);

        this.items = [
            {
                label: 'Inventario',
                items:[
                    {label: 'Añadir elemento', icon: 'pi pi-plus', url: '/addelement'},
                    {label: 'Buscar elemento', icon: 'pi pi-search', url: '/searchelement'},
                    {label: 'Editar elemento', icon: 'pi pi-file-edit', url: '/editelement'},
                    {label: 'Eliminar elemento', icon: 'pi pi-delete-left', url: '/delelement'}
                ]
            }
        ];

        this.items2 = [
            {
                label: 'Reservas',
                items:[
                    {label: 'Añadir reserva', icon: 'pi pi-plus', url: '/addbooking'},
                    {label: 'Buscar reserva', icon: 'pi pi-search', url: '/searchbooking'},
                    {label: 'Editar reserva', icon: 'pi pi-file-edit', url: '/editbooking'},
                    {label: 'Cancelar reserva', icon: 'pi pi-file-excel', url: '/deletebooking'}
                ]
            }
        ];

        this.items3 = [
            {
                label: 'Facturación',
                items:[
                    {label: 'Añadir factura', icon: 'pi pi-plus', url: '/addbilling'},
                    {label: 'Buscar factura', icon: 'pi pi-search', url: '/searchbilling'},
                    {label: 'Editar factura', icon: 'pi pi-file-edit', url: '/editbilling'},
                    {label: 'Cancelar factura', icon: 'pi pi-file-excel', url: '/deletebilling'}
                ]
            }
        ];

    }
    render() {
        
        return (
            <div>
                <div className='card mx-3 mt-3 mb-3'>
                    <Menu model={this.items}/>
                </div>
                <div className='card mx-3 mt-3 mb-3'>
                    <Menu model={this.items2}/>
                </div>
                <div className='card mx-3 mt-3 mb-3'>
                    <Menu model={this.items3}/>
                </div>
            </div>
        );
    }
}

export default menuAdmin;