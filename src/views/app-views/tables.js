import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { setLocalState } from '../../helpers/handlers';
import { GeneralModal } from '../../component/modals';

const ModalBody = () => {
    return <div>hell yeah!!!</div>
};

export const Tables = () => {

    const [tables, setTables] = useState({
        allTables: []
    });
    const [control, setControl] = useState({
        showModal: false
    });
    
    const {store, actions} = useContext(Context);

    const toggleModal = () => {
        setControl((prevControl) => ({...prevControl, showModal: !prevControl.showModal}))
    };

    const hideModal = () => {
        setControl((prevControl) => ({...prevControl, showModal: false}))
    };

    useEffect(() => {
        // * se debe hacer llamada a API en esta función actions.loadAPI()
        const tables_data = store.tables.map((item, index) => {
            return {id: `table-${index.toString()}`, name: item.name, qrcode: item.qrcode, hover: false}
        });
        setTables({
            allTables: setLocalState(tables.allTables, tables_data)
        });

        document.addEventListener('mousedown', handleWindowClick, false);
        return () => {
            document.removeEventListener('mousedown', handleWindowClick, false);
        }
        //eslint-disable-next-line
    }, []);

    const handleWindowClick = (event) => {
        const node = document.getElementById("edit-tables");
        if (node === null) {
            return undefined;
        } else if (node.contains(event.target) || store.loading_API) {
            return undefined;
        };
        hideModal();
    };

    return (
        <div id="tables">
            <div className="" data-control="table-control">
                <h3 onClick={toggleModal} > + Agregar Mesas</h3>
                {tables.allTables.map(item => {
                    return <p key={item.id}>{item.name}<span>deleteButton</span></p>
                })}
            </div>
            <div className="" data-control="qrcode-print">
                <h1>Descargar Códigos QR</h1>
            </div>
            {control.showModal && <GeneralModal 
                id="edit-tables"
                title="Agregar Mesas"
                body={ModalBody()} 
                submit={{name: "Agregar", callBack: hideModal}}
                cancel={{name: "Cancelar", callBack: hideModal}}
            />}
        </div>
    );
}