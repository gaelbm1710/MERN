import React, {useState} from 'react'
import { Tab } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import {ListOpes, OpesForm} from "../../../components/Admin/Ope"


export function Opes() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal =()=> setShowModal((prevState) =>!prevState);
  const onReload =()=>setReload((prevState)=>!prevState);
  const panes = [
    {
      render: () =>(
        <Tab.Pane>
          <ListOpes reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    }
  ]
  return (
    <>
    <div className='operacionesm-page'>
      <Tab menu={{secondary: true}} panes={panes}/>
    </div>
    <BasicModal showModal={showModal} close={onOpenCloseModal} title="Agreagar cotizacionOpE">
      <OpesForm close={onOpenCloseModal} onReload={onReload}/>
    </BasicModal>
    </>
  )
}
