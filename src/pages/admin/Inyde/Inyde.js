import React, {useState} from 'react';
import {Tab} from "semantic-ui-react";
import "./inyde.scss";
import { BasicModal } from '../../../components/Shared';
import {ListInyde, InydeForm} from "../../../components/Admin/Inyde"

export function Inyde() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState)=>!prevState);
  const panes = [
    {
      render: () =>(
        <Tab.Pane>
          <ListInyde reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    }
  ]

  return (
    <>
    <div className='cotizacionm-page'>
      <Tab menu={{secondary: true}} panes={panes} />
    </div>
    <BasicModal showModal={showModal} close={onOpenCloseModal} title="Agregar Cotizacion">
      <InydeForm close={onOpenCloseModal} onReload={onReload}/>
    </BasicModal>
    </>
  )
}
