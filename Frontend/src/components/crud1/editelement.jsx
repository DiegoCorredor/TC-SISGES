import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';


class editelement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameElement: '',
            typeElement: '',
            countElement: '',
            stateElement: '',
            valueElement: '',
            dependencyElement: '',
            descriptionElement: '',
            optionsTypeElement: [],
            optionsStatusElement: [],
            optionsDependencies: [],
            optionsSearch:[],
            optionSelected: ''
        }
    }

    getNames(){
        axios.get('https://sgri--backend--zp5spsybyvz4.code.run/inventary/').then(res => {
            this.setState({ optionsSearch: res.data.data })
        });
    }

    getElement(id){
        axios.get('https://sgri--backend--zp5spsybyvz4.code.run/inventary/'+id).then(res => {
            this.setState({ ...res.data.data })
        });
    }

    getTypeElements() {
        axios.get('https://sgri--backend--zp5spsybyvz4.code.run/dropdowns/typeElement').then(res => {
            this.setState({ optionsTypeElement: res.data.data })
        });
    }

    getStatuses() {
        axios.get('https://sgri--backend--zp5spsybyvz4.code.run/dropdowns/statuses').then(res => {
            this.setState({ optionsStatusElement: res.data.data })
        });
    }

    getDependencies() {
        axios.get('https://sgri--backend--zp5spsybyvz4.code.run/dropdowns/dependencies').then(res => {
            this.setState({ optionsDependencies: res.data.data })
        });
    }

    onOptionSelect(e){
        this.setState({optionSelected: e.target.value}); 
        this.getElement(e.target.value);
    }

    refresh(){
        this.setState({
            nameElement: '',
            typeElement: '',
            countElement: '',
            stateElement: '',
            valueElement: '',
            dependencyElement: '',
            descriptionElement: ''
        })
    }

    update(){
        axios.put('https://sgri--backend--zp5spsybyvz4.code.run/inventary/'+this.state.optionSelected, { nameElement: this.state.nameElement, typeElement: this.state.typeElement, countElement: parseInt(this.state.countElement), stateElement: this.state.stateElement, valueElement: this.state.valueElement, dependencyElement: this.state.dependencyElement, dateStart: new Date(), descriptionElement: this.state.descriptionElement })
            .then(res => { alert(res.data.message); this.refresh(); this.props.navigate('/dashboard')});
    }

    componentDidMount(){
        this.getNames();
        this.getTypeElements();
        this.getStatuses();
        this.getDependencies();
    }

    render(){
        return(
            <div className='card max-w-screen'>
                <div className=' align-items-center justify-content-start'>
                    <div className='align-items-center justify-content-center'>
                        <div className='py-2 px-5 sm:px-8 rounded'>
                        <h3 className='mx-2 px-2'>Editar elemento del inventario</h3><hr/>
                            <div className='card'>
                                <div className='formgrid grid surface-100 border-round'>
                                    <div className='field col'>
                                        <label className="text-900 font-medium mb-2">Seleccione el árticulo para modificarlo</label>
                                        <Dropdown className='w-full' value={this.state.optionSelected} optionLabel='nameElement' optionValue='idinventary' options={this.state.optionsSearch} onChange={(e)=>this.onOptionSelect(e)} placeholder="Elija el árticulo a modificar"/>
                                    </div>
                                </div><hr/>
                                <div className='formgrid grid'>
                                    <div className='field col-6'>
                                        <label className="block text-900 font-medium mb-2">Nombre del árticulo</label>
                                        <InputText className='w-full' value={this.state.nameElement} onChange={(e) => { this.setState({ nameElement: e.target.value }) }} placeholder="Ej. Bombillo" required />
                                    </div>
                                    <div className='field col-4'>
                                        <label className="block text-900 font-medium mb-2">Tipo de árticulo</label>
                                        <Dropdown className='w-full' value={this.state.typeElement} options={this.state.optionsTypeElement} onChange={(e) => { this.setState({ typeElement: e.target.value }); console.log(e.target.value); }} placeholder="Elija el tipo de árticulo" optionLabel='typeElement' optionValue='idtypeElement' required />
                                    </div>
                                    <div className='field col-2'>
                                        <label className="block text-900 font-medium mb-2">Cantidad</label>
                                        <InputText className='w-full' value={this.state.countElement} onChange={(e) => { this.setState({ countElement: e.target.value }) }} type="number" placeholder="00" required />
                                    </div>
                                </div>
                                <div className='formgrid grid'>
                                    <div className='field col-5'>
                                        <label className="block text-900 font-medium mb-2">Estado del árticulo</label>
                                        <Dropdown className='w-full' value={this.state.stateElement} options={this.state.optionsStatusElement} onChange={(e) => { this.setState({ stateElement: e.target.value }) }} placeholder="Elija el estado del árticulo" optionLabel='status' optionValue='idstatus' required />
                                    </div>
                                    <div className='field col-2'>
                                        <label className="block text-900 font-medium mb-2">Valor del árticulo</label>
                                        <InputText className='w-full' value={this.state.valueElement} onChange={(e) => { this.setState({ valueElement: e.target.value }) }} type="number" placeholder="00" required />
                                    </div>
                                    <div className='field col-5'>
                                        <label className="block text-900 font-medium mb-2">Dependencia a la que pertenece</label>
                                        <Dropdown className='w-full' value={this.state.dependencyElement} options={this.state.optionsDependencies} onChange={(e) => { this.setState({ dependencyElement: e.target.value }) }} placeholder="Elija la dependencia del árticulo" optionLabel='dependencyName' optionValue='iddependency' required />
                                    </div>
                                </div>
                                <div className='formgrid grid'>
                                    <div className='field col'>
                                        <label className="block text-900 font-medium mb-2">Observaciones</label>
                                        <InputTextarea className='w-full' value={this.state.descriptionElement} onChange={(e) => { this.setState({ descriptionElement: e.target.value }) }} rows={5} cols={30} />
                                    </div>
                                </div>
                                <div className='formgrid grid justify-content-end'>
                                    <div className='field'>
                                        <Button label="Limpiar" onClick={()=>this.refresh()} icon="pi pi-eraser" className="p-button-danger mx-1"/>
                                        <Button label="Guardar cambios" onClick={()=>this.update()} icon="pi pi-save" className="p-button-success mx-1"/>
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

export default editelement;