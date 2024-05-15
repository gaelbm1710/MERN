import React, { useState } from 'react'
import { BasicModal } from '../../../components/Shared';
import { Tab } from 'semantic-ui-react'
import { ComesForm, ListCome } from "../../../components/Admin/Come";

export function GestionComercial() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);
  const panes = [{
    render: () => (
      <Tab.Pane>
        <ListCome actividad="nueva" reload={reload} onReload={onReload} />
      </Tab.Pane>
    )
  }]
  return (
    <>
      <div className='gestioncomercial-page'>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title='Agregar cotización'>
        <ComesForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  )
}
