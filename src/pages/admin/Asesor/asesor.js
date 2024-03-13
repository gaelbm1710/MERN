import React, {useState} from 'react'
import { BasicModal } from '../../../components/Shared'
import { Button, Tab } from 'semantic-ui-react'
import "./asesor.scss";
import {AsesorForm, ListAsesor} from "../../../components/Admin/Asesor"

export function Asesor() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal =()=>setShowModal((prevState) =>!prevState)
  const onReload = () => setReload((prevState) => !prevState);
  const panes=[
    {
      render: ()=>(
        <Tab.Pane>
         <ListAsesor reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    }
  ]
  return (
    <>
      <div className='cotizacion-page'>
        <Button className='cotizacion-page__add' primary onClick={onOpenCloseModal}>Nueva Cotización</Button>
        <Tab menu={{secondary: true}} panes={panes}/> {" "}
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear Menu">
        <AsesorForm onClose={onOpenCloseModal} onReload={onReload}/>
      </BasicModal>
    </>
  )
}
