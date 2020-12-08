import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { validate_all, validate_field, noSpace } from '../../helpers/validations';
import { setLocalState, handleWindowClick } from '../../helpers/handlers';
import { GeneralModal } from '../../component/modal';


export const Tables = () => {
    
    const ModalHeader = () => {
        return (
            <h1>Agregar Mesas</h1>
        )
    };
    
    const ModalBody = () => {
        return (
            <form id="tables-form" onSubmit={hideModal} noValidate>
                <div className="form-group">
                    <label>
                    <input
                        className="radio-input"
                        type="radio" 
                        name="inputOption"
                        value="option1"
                        checked={modalForm.inputOption === "option1"}
                        onChange={(e) => handleInputChange(e)}
                    />
                    Agregar una
                    </label>
                </div>
                <div className="form-group">
                        <label htmlFor="tableNumber">N°</label>
                        <input
                            className="input"
                            type="number" 
                            min="0"
                            name="tableNumber"
                            value={modalForm.tableNumber || ""}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            // onBlur={check_field}
                            disabled={modalForm.inputOption === "option2"}
                            required
                        />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            className="radio-input"
                            type="radio" 
                            name="inputOption"
                            value="option2"
                            checked={modalForm.inputOption === "option2"}
                            onChange={(e) => handleInputChange(e)}
                        />
                        Agregar varias
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="fromNumber">N° desde</label>
                    <input
                        className="input"
                        type="number" 
                        min="0"
                        name="fromNumber"
                        value={modalForm.fromNumber || ""}
                        onChange={handleInputChange}
                        onKeyPress={noSpace}
                        // onBlur={check_field}
                        disabled={modalForm.inputOption === "option1"}
                        required
                    />
                </div>               
                <div className="form-group">
                    <label htmlFor="tableNumber">N°</label>
                    <input
                        className="input"
                        type="number" 
                        min="0"
                        name="toNumber"
                        value={modalForm.toNumber || ""}
                        onChange={handleInputChange}
                        onKeyPress={noSpace}
                        // onBlur={check_field}
                        disabled={modalForm.inputOption === "option1"}
                        required
                    />
                </div>
            </form>
        );
    };

    const ModalFooter = () => {
        return (
            <div className="submit">
                <button onClick={handleModalSubmit} className="btn btn-primary" autoFocus> Agregar</button>
                <button onClick={hideModal} className="btn btn-danger"> Cancelar</button>
            </div>
        )
    };

    const handleInputChange = (e) => {
        setModalForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleModalSubmit = (e) => {
        e.preventDefault()
    };
    
    const [tables, setTables] = useState([]);
    
    const [control, setControl] = useState({
        showModal: false
    });

    const [modalForm, setModalForm] = useState({
        inputOption: "option1",
        tableNumber: "",
        fromNumber: "",
        toNumber: ""
    });

    const {store, actions} = useContext(Context);

    const toggleModal = () => {
        setControl((prevControl) => ({
            ...prevControl, 
            showModal: !prevControl.showModal
        }))
    };

    const hideModal = () => {
        setControl((prevControl) => ({
            ...prevControl, 
            showModal: false
        }))
    };

    useEffect(() => {
        // * se debe hacer llamada a API en esta función actions.loadAPI()
        const tables_data = store.tables.map((item) => {
            return {...item, hover: false}
        });
        setTables(tables_data);

        document.addEventListener('mousedown', onWindowClick, false);
        return () => {
            document.removeEventListener('mousedown', onWindowClick, false);
        }
        //eslint-disable-next-line
    }, []);

    const onWindowClick = (event) => {
        if (handleWindowClick(event, "modal-addTables", store.loading_API)) { //edit-tables is the id of the modal to hide-show
            hideModal();
        };
    };

    const deleteTable = (table_id) => {
        const newTables = tables.filter((item) => {
            if (item.name !== table_id) {
                return item
            }
        });
        const newStore = newTables.map((item) => {
            delete item.hover;
            return item
        })
        const result = actions.updateTables(newStore);
        if (result) {
            setTables(newTables);
        }
    };

    const handleHoverIn = (table_id) => {
        const newState = tables.map((item) => {
            if (item.name === table_id) {
                return {...item, hover:true}
            } else {
                return item
            }
        });
        setTables(newState);
    };

    const handleHoverOut = (table_id) => {
        const newState = tables.map((item)=>{
            if (item.name === table_id) {
                return {...item, hover:false}
            } else {
                return item
            }
        });
        setTables(newState);
    }

    return (
        <div id="tables">
            <div className="" data-control="table-control">
                <h3 onClick={toggleModal} > + Agregar Mesas</h3>
                {tables[0] ?  tables.map(item => {
                    return(
                        <p 
                        key={item.name}
                        onMouseEnter={() => handleHoverIn(item.name)}
                        onMouseLeave={() => handleHoverOut(item.name)}
                        >
                            Mesa {item.name}
                            {item.hover && <span 
                            onClick={() => deleteTable(item.name)}
                            > *delete*</span>}
                        </p>)
                    })
                : <p>No hay mesas</p>}
            </div>
            <div className="" data-control="qrcode-print">
                <h1>Descargar Códigos QR</h1>
            </div>
            {control.showModal && <GeneralModal 
                id="modal-addTables"
                header={ModalHeader()}
                body={ModalBody()} 
                footer={ModalFooter()}
            />}
        </div>
    );
}