import React, {useState} from 'react'
import "./SoporteItem.scss";
import {Button, Icon} from "semantic-ui-react";
import { BasicModal } from '../../../Shared';
import { SoporteForm } from '../SoporteForm/SoporteForm';


export function SoporteItem(props) {
    const {soporte, onReload} = props;
    const [showModal, setshowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const onOpenCloseModal = ()=> setshowModal((prevState) => !prevState);
    const openUpdateSoporte =() =>{
        setTitleModal(`Actualizar enlace: ${soporte.folio}`);
        onOpenCloseModal();
    }
    
  return (
    <>
    <div className='ticket-item'>
        <div className='ticket-item__info'>
            <h3>{soporte.folio}</h3>
            <h4>{soporte.servicio}</h4>
            <span>{soporte.estado}</span>
            <span>{soporte.asignado}</span>
        </div>
        <Button icon as='a' primary onClick={openUpdateSoporte}>
            <Icon name='eye'/>
        </Button>
    </div>
    <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <SoporteForm onClose={onOpenCloseModal} onReload={onReload} soporte={soporte}/>
    </BasicModal>
    </>
  )
}
