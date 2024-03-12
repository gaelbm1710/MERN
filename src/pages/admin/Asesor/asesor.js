import React, {useState} from 'react'
import { BasicModal } from '../../../components/Shared'
import { Button, Tab } from 'semantic-ui-react'
import "./asesor.scss";
import {AsesorForm, ListAsesor} from "../../../components/Admin/Asesor"

export function Asesor() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal =()=>setShowModal((prevState)=>!prevState)
  const onReload =()=>setReload((prevState)=>!prevState)
  const panes=[
    {
      render: ()=>(
        <Tab.Pane>
         <h1>Lista Cotizaciones</h1>
        </Tab.Pane>
      )
    }
  ]
  return (
    <>
    <div className='cotizaciones-page'>
      <Button className='cotizaciones-page__add' primary onClick={onOpenCloseModal} >Generar Cotización</Button>
      <Tab menu={{secondary: true}} panes={panes}/>
    </div>
    <BasicModal showModal={showModal} close={onOpenCloseModal} title="Agreagar cotización">
      <AsesorForm onClose={onOpenCloseModal} onReload={onReload}/>
    </BasicModal>
    </>
  )
}
