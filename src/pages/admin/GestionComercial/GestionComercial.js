import React, {useState} from 'react'
import { BasicModal } from '../../../components/Shared';
import { Tab } from 'semantic-ui-react';
import "./gestionComercial.scss";
import {ComeForm, ListCome} from "../../../components/Admin/Come";

export function GestionComercial() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal =()=> setShowModal((prevState) =>!prevState);
  const onReload =()=>setReload((prevState)=>!prevState);
  const panes =[{
    render: () =>(
      <Tab.Pane>
        <ListCome reload={reload} onReload={onReload}/>
      </Tab.Pane>
    )
  }]
  return (
    <>
    <div className='gestioncomercial-page'>
      <Tab menu={{secondary: true}} panes={panes}/>
    </div>
    <BasicModal showModal={showModal} close={onOpenCloseModal} title="Agregar cotizacionCome">
      <ComeForm close={onOpenCloseModal} onReload={onReload}/>
    </BasicModal>
    </>
  )
}
