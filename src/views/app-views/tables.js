import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { validate_all, validate_field, noSpace } from '../../helpers/validations';
import { setLocalState, handleWindowClick } from '../../helpers/handlers';
import { GeneralModal } from '../../component/modal';
import { ReactComponent as Delete } from "../../img/delete.svg";
import { ReactComponent as QRcode } from "../../img/qrcode.svg";


export const Tables = () => {
    
    const ModalHeader = () => {
        return (
            <h1>Agregar Mesas</h1>
        )
    };
    
    const ModalBody = () => {
        return (
            <form id="tables-form" onSubmit={handleModalSubmit} noValidate>
                <div className="form-group">
                    <label>
                    <input
                        className="radio-input"
                        type="radio" 
                        name="inputOption"
                        value="option1"
                        checked={userInput.inputOption === "option1"}
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
                            value={userInput.tableNumber || ""}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            // onBlur={check_field}
                            disabled={userInput.inputOption === "option2"}
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
                            checked={userInput.inputOption === "option2"}
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
                        value={userInput.fromNumber || ""}
                        onChange={handleInputChange}
                        onKeyPress={noSpace}
                        // onBlur={check_field}
                        disabled={userInput.inputOption === "option1"}
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
                        value={userInput.toNumber || ""}
                        onChange={handleInputChange}
                        onKeyPress={noSpace}
                        // onBlur={check_field}
                        disabled={userInput.inputOption === "option1"}
                        required
                    />
                </div>
                <input type="submit" style={{display:"none"}}></input>
            </form>
        );
    };

    const ModalFooter = () => {
        return (
            <div className="submit">
                <button onClick={handleModalSubmit} className="btn btn-primary"> Agregar</button>
                <button onClick={hideModal} className="btn btn-danger"> Cancelar</button>
            </div>
        )
    };

    const handleInputChange = (e) => {
        setuserInput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleModalSubmit = (e) => {
        e.preventDefault()
        console.log(e);
    };
    
    const [tables, setTables] = useState([]);
    
    const [control, setControl] = useState({
        addTableModal: false,
        downloadList: false,

    });

    const [userInput, setuserInput] = useState({
        inputOption: "option1",
        downloadOption: "option1",
        tableNumber: "",
        fromNumber: "",
        toNumber: ""
    });

    const {store, actions} = useContext(Context);

    const toggleComponent = (e) => {
        const target = e.target.dataset["control"];
        setControl((prevControl) => ({
            ...prevControl,
            [target]: !prevControl[target]
        }));
    };

    const hideModal = () => {
        setControl((prevControl) => ({
            ...prevControl, 
            addTableModal: false
        }))
    };

    useEffect(() => {
        // * se debe hacer llamada a API en esta función actions.loadAPI()
        const tables_data = store.tables.map((item) => {
            return {...item, hover: false, checked: false}
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
    };

    const deleteTable = (table_id) => {
        const newTables = tables.filter((item) => {
            if (item.name !== table_id) {
                return item
            }
        });
        const newStore = newTables.map((item) => {
            return {name: item.name, qrcode: item.qrcode} //extract only the requested by API
        })
        const result = actions.updateTables(newStore);
        if (result) {
            setTables(newTables);
        }
    };

    const handleTableSelect = (table_id) => {
        const newTables = tables.map((item) => {
            if (item.name === table_id && !item.checked) {
                return {...item, checked:true}
            } else if (item.name === table_id) {
                return {...item, checked:false}
            } else {
                return item
            }
        });
        setTables(newTables);
    }

    return (
        <div id="tables">
            <div className="" data-control="table-control">
                <button data-control="addTableModal" onClick={(e) => toggleComponent(e)} className="btn-link title"> + Agregar Mesas</button>
                <div className="table-list">
                    {tables[0] ?  tables.map(item => {
                        return(
                            <p
                            key={item.name}
                            onMouseEnter={() => handleHoverIn(item.name)}
                            onMouseLeave={() => handleHoverOut(item.name)}
                            >
                                {`Mesa ${item.name.slice("mesa ")}`}
                                {item.hover && <span 
                                onClick={() => deleteTable(item.name)}
                                > <Delete/></span>}
                            </p>
                            )
                        })
                    : <p>No hay mesas</p>}
                </div>
            </div>
            <div className="" data-control="qrcode-print">
                <h1> <QRcode /> Descargar Códigos QR</h1>
                <div className="download-options">
                    <label>
                        <input
                            className="radio-input"
                            type="radio" 
                            name="downloadOption"
                            value="option1"
                            checked={userInput.downloadOption === "option1"}
                            onChange={(e) => handleInputChange(e)}
                        />
                        Descargar todos
                    </label>
                    <label>
                        <input
                            className="radio-input"
                            type="radio" 
                            name="downloadOption"
                            value="option2"
                            checked={userInput.downloadOption === "option2"}
                            onChange={(e) => handleInputChange(e)}
                        />
                        Seleccionar mesas
                    </label>
                </div>
                <div data-control="table-select">
                    <button 
                    className="btn btn-outline-primary"
                    data-control = "downloadList"
                    disabled={userInput.downloadOption === "option1"}
                    >Seleccionar mesas <i className="arrow down"></i></button>
                    {/* <h3 data-control = "downloadList" onClick ={(e) => toggleComponent(e)} >Seleccionar mesas -</h3> */}
                    <ul className={`${control.downloadList ? "show" : "hide"} download-list`}>
                        {tables.map(item => {
                            return (
                                <li>
                                    {`Mesa ${item.name.slice("mesa ")}`}
                                    <input
                                    className="checkbox"
                                    type="checkbox" 
                                    checked={item.checked}
                                    onChange={() => handleTableSelect(item.name)}
                                    disabled={userInput.downloadOption === "option1"}
                                />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <button className="btn btn-primary">Descargar</button>
            </div>
            {control.addTableModal && <GeneralModal 
                id="modal-addTables"
                header={ModalHeader()}
                body={ModalBody()} 
                footer={ModalFooter()}
            />}
        </div>
    );
}