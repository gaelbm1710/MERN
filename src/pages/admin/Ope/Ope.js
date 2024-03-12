import React, {useState} from 'react';
import { Tab } from 'semantic-ui-react';
import "./ope.scss";
import { BasicModal } from '../../../components/Shared';
import {ListOpe, OpeForm} from "../../../components/Admin/Ope"

export function Ope() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal =()=> setShowModal((prevState) =>!prevState);
  const onReload =()=>setReload((prevState)=>!prevState);
  const panes = [
    {
      render: () =>(
        <Tab.Pane>
          <ListOpe reload={reload} onReload={onReload}/>
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
      <OpeForm close={onOpenCloseModal} onReload={onReload}/>
    </BasicModal>
    </>
  )
}
