import React , {useState} from 'react'
import { BasicModal } from '../../../components/Shared';
import { Tab } from 'semantic-ui-react';
import {ComessForm, ListComess} from "../../../components/Admin/Come";

export function GestionComercialss() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal =()=> setShowModal((prevState) =>!prevState);
  const onReload =()=>setReload((prevState)=>!prevState);
  const panes =[{
    render: () =>(
      <Tab.Pane>
        <ListComess reload={reload} onReload={onReload}/>
      </Tab.Pane>
    )
  }]
  return (
    <>
    <div className='gestioncomercial-page'>
      <Tab menu={{secondary: true}} panes={panes}/>
    </div>
    <BasicModal showModal={showModal} close={onOpenCloseModal} title="Agregar cotizacionCome">
      <ComessForm close={onOpenCloseModal} onReload={onReload}/>
    </BasicModal>
    </>
  )
}
