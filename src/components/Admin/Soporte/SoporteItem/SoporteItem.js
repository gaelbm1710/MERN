import React, {useState} from 'react'
import "./SoporteItem.scss";
import {Button, Icon, Confirm} from "semantic-ui-react";
import { ENV } from '../../../../utils';
import { BasicModal } from '../../../Shared';
import { SoporteForm } from '../SoporteForm/SoporteForm';
import { Soporte } from '../../../../api';
import { useAuth } from '../../../../hooks';

const soporteController = new Soporte();

export function SoporteItem(props) {
    const {soporte, onReload, onClose} = props;
    const {accessToken} = useAuth();
    const dxp = soporte._id.substring(24,18);
    const [showModal, setshowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const onOpenCloseModal = ()=> setshowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
    const openUpdateSoporte =() =>{
        setTitleModal(`Actualizar enlace: ${dxp}`);
        onOpenCloseModal();
    }
    const onDelete = async () =>{
        try {
            console.log("Eliminar el ticket!!!");
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <>
    <div className='ticket-item'>
        <div className='ticket-item__info'>
            <h3>#{dxp}</h3>
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
