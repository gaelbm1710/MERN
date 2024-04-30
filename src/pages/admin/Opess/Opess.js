import React, {useState} from 'react'
import { Tab } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import {ListOpess, OpessForm} from "../../../components/Admin/Ope"

export function Opess() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal =()=> setShowModal((prevState) =>!prevState);
  const onReload =()=>setReload((prevState)=>!prevState);
  const panes = [
    {
      render: () =>(
        <Tab.Pane>
          <ListOpess reload={reload} onReload={onReload}/>
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
      <OpessForm close={onOpenCloseModal} onReload={onReload}/>
    </BasicModal>
    </>
  )
}
