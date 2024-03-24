import React, {useState} from 'react'
import { BasicModal } from '../../../components/Shared'
import { Button, Tab } from 'semantic-ui-react'
import "./asesor.scss";
import {AsesorForm, ListAsesor} from "../../../components/Admin/Asesor"

export function Asesor() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal =()=>setShowModal((prevState) =>!prevState)
  const onOpenCloseModal2 =()=>setShowModal((prevState) =>!prevState)
  const onOpenCloseModal3 =()=>setShowModal((prevState) =>!prevState)
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
        <Button className='cotizacion-page__new' value="nueva" primary onClick={onOpenCloseModal}>Nueva Cotización</Button>
        <Button className='cotizacion-page__add' value="agregar" primary onClick={onOpenCloseModal2}>Alta de Presentación</Button>
        <Button className='cotizacion-page__add' value="cambio" primary onClick={onOpenCloseModal3}>Cambio de Base</Button>
        <Tab menu={{secondary: true}} panes={panes}/> {" "}
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear Cotizacion">
        <AsesorForm onClose={onOpenCloseModal} onReload={onReload}/>
      </BasicModal>
      <BasicModal show={showModal} close={onOpenCloseModal2} title="Alta Pesentacion">
        <h1>Alta de Presentación</h1>
      </BasicModal>
      <BasicModal show={showModal} close={onOpenCloseModal3} title="Cambio Base">
        <h1>Cambio de Base</h1>
      </BasicModal>
    </>
  )
}
