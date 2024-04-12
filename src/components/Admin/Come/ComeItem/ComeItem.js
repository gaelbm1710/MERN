import React, {useState} from 'react'
import "./ComeItem.scss";
import { Button, Icon } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import {ComeForm} from "../ComeForm"


export function ComeItem(props) {
  const {mag, onReload} = props
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const dxp = mag._id.substring(24,18);
  const onOpenCloseModal = ()=>setShowModal((prevState) => !prevState);
  const openUpdateMag=()=>{
    setTitleModal(`Revisar cotización: #${dxp}`)
    onOpenCloseModal();
  }


  return (
    <>
    <div className='cotizacion-item'>
      <div className='cotizacion-item'>
        <p className='cotizacion-item__info-ope'>Cotizacion:</p>
        <p className='cotizacion-item__info-dxp'>#{dxp}</p>
      </div>
      <div>
        <Button icon primary onClick={openUpdateMag}>
          <Icon name='edit'/>
        </Button>
      </div>
    </div>
    <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
      <ComeForm onClose={onOpenCloseModal} onReload={onReload} mag={mag}/>
    </BasicModal>
    </>
  )
}
