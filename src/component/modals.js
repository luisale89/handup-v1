import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';

export const GeneralModal = (props) => {
    return (
        <div className="general-modal">
            <div className="modal-container" id={props.id} >
                <div className="modal-header">
                    <h1>{props.title}</h1>
                </div>
                <div className="modal-body">
                    {props.body}
                </div>
                <div className="modal-footer">
                    <button onClick={props.submit.callBack} className="btn btn-primary"> {props.submit.name}</button>
                    <button onClick={props.cancel.callBack} className="btn btn-danger"> Cancelar</button>
                </div>
            </div>
        </div>
    )
}