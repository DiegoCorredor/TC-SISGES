import React, { Component } from 'react';

class Pendingbooking extends Component {

    render() {
        return (
            <div>
                <div className='flex align-items-center justify-content-center my-8'>
                    <div className='align-items-center justify-content-center'>
                        <div className='gray-color py-8 px-5 sm:px-8 rounded'>
                            <h4 className='text-900 text-3xl font-medium text-center'>Transacción en proceso</h4><hr />
                            <p className="text-600 font-medium text-center">Su reservación está pendiente, la transacción<br/>
                                está siendo procesada. Espere, por favor.</p>
                            <div className='card'>
                                <div className='formgrid grid'>
                                    <div className='field col-12 text-center '>
                                        <label className="block text-900 font-medium mb-2">Tel: 999 - 999 - 9999</label>
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

export default Pendingbooking;