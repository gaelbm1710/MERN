import React, {useState} from 'react'
import { BasicModal } from '../../../components/Shared';
import { Button, Tab } from 'semantic-ui-react';
import "./presentacion.scss";
import { AsesorForma, ListaAsesor } from '../../../components/Admin/Asesor';


export function Presentacion() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);
    const onOpenCloseModal = () => {
        setShowModal(prevState => !prevState)
    }
    const onReload = () => setReload((prevState)=>!prevState);
    const panes =[
        {
            render: () =>(
                <Tab.Pane attached={false}>
                    <ListaAsesor reload={reload} onReload={onReload}/>
                </Tab.Pane>
            )
        }
    ]
  return (
    <>
    <div>
        <Button className='cotizacion-page__new' value="agregar" primary onClick={()=> onOpenCloseModal('agregar')}>Nueva Presentación</Button>
        <Tab menu={{secondary: true}} panes={panes}/>
    </div>
    <BasicModal show={showModal} close={onOpenCloseModal} title={'Pedir presentación'} >
        <AsesorForma close={onOpenCloseModal} onReload={onReload} />
    </BasicModal>
    </>
  )
}
