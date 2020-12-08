import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';

export const GeneralModal = (props) => {
    
    return (
        <div className="general-modal">
            <div className="modal-container" id={props.id} >
                <div className="modal-header">
                    {props.header}
                </div>
                <div className="modal-body">
                    {props.body}
                </div>
                <div className="modal-footer">
                    {props.footer}
                </div>
            </div>
        </div>
    )
}