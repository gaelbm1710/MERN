import React, { useState } from 'react'
import "./SoporteItem.scss";
import { Button, Icon, Label } from "semantic-ui-react";
import { BasicModal } from '../../../Shared';
import { SoporteView } from '../SoporteForm';
import { SoporteAsignar } from '../SoporteAsignar'
import { SoporteComentarios } from '../SoporteComentarios';
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';
import { SoporteCancel } from '../SoporteCancel';


export function SoporteItem(props) {
    const { soporte, onReload, close } = props;
    const { user: { role } } = useAuth();
    const isSist = role === "sistemas";
    const isAdmin = role === "admin";
    const date = new Date(soporte.created_at);
    const createdate = date.toLocaleDateString();
    const [showsecondModal, setshowsecondModal] = useState(false);
    const [showthirdModal, setshowthirdModal] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const [showfourModal, setshowfourModal] = useState(false)
    const [titleModal, setTitleModal] = useState("");
    const onOpenCloseModal = () => setshowModal((prevState) => !prevState);
    const onOpenCloseSecondModal = () => setshowsecondModal((prevState) => !prevState);
    const onOpenCloseThirdModal = () => setshowthirdModal((prevState) => !prevState);
    const onOpenCloseFourModal = () => setshowfourModal((prevState) => !prevState);
    const openUpdateSoporte = () => {
        setTitleModal(`Actualizar Ticket: ${soporte.folio}`);
        onOpenCloseModal();
    }
    const openVerSoporte = () => {
        setTitleModal(`Información del Ticket: ${soporte.folio}`);
        onOpenCloseSecondModal();
    }
    const openAsignarTicket = () => {
        setTitleModal(`Asignar Ticket: ${soporte.folio}`)
        onOpenCloseThirdModal();
    }
    const openCancelarTicket = () => {
        setTitleModal(`Cancelar Ticket: ${soporte.folio}`)
        onOpenCloseFourModal();
    }

    const getStatusColor = (estado) => {
        switch (estado) {
            case 'Finalizado':
                return 'green';
            case 'Pendiente por Proveedor':
                return 'gray';
            case 'Pendiente por Usuario':
                return 'orange';
            case 'Cancelado':
                return 'red';
            default:
                return 'yellow';
        }
    }
    let getStatusPrioridad;
    if (soporte.prioridad === 'Baja') {
        getStatusPrioridad = 'blue';
    } else if (soporte.prioridad === 'Media') {
        getStatusPrioridad = 'orange';
    } else if (soporte.prioridad === 'Alta') {
        getStatusPrioridad = 'yellow';
    } else if (soporte.prioridad === 'Urgente') {
        getStatusPrioridad = 'red';
    } else if (soporte.prioridad === 'Proyecto') {
        getStatusPrioridad = 'green';
    }

    //const isSist = role === "sistemas";

    const documentosUrl = soporte.documentos ? `${ENV.TICKETSOPORTE}/${soporte.documentos}` : 'No agrego Documentos'

    let descargaDocumentos;
    if (documentosUrl === 'No agrego Documentos') {
        descargaDocumentos = <span>No agregó Documento</span>
    } else {
        descargaDocumentos = <span>Descarga Documentos<Button icon primary href={documentosUrl} download={soporte.documentos}><Icon name='download' /></Button></span>
    }

    let VistasporRole;
    if (isSist || isAdmin) {
        VistasporRole =
            <>
                <Button icon primary onClick={openVerSoporte}>
                    <Icon name='eye' />
                </Button>
                <Button icon color='orange' onClick={openUpdateSoporte}>
                    <Icon name='comments' />
                </Button>
                <Button icon color='green' onClick={openAsignarTicket}>
                    <Icon name='users' />
                </Button>
                <Button icon color='red' onClick={openCancelarTicket}>
                    <Icon name='cancel' />
                </Button>
                <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                    <SoporteComentarios close={onOpenCloseModal} onReload={onReload} soporte={soporte} />
                </BasicModal>
                <BasicModal show={showsecondModal} close={onOpenCloseSecondModal} title={titleModal}>
                    <SoporteView close={onOpenCloseSecondModal} onReload={onReload} soporte={soporte} />
                </BasicModal>
                <BasicModal show={showthirdModal} close={onOpenCloseThirdModal} title={titleModal}>
                    <SoporteAsignar close={onOpenCloseThirdModal} onReload={onReload} soporte={soporte} />
                </BasicModal>
                <BasicModal show={showfourModal} close={onOpenCloseFourModal} title={titleModal}>
                    <SoporteCancel close={onOpenCloseFourModal} onReload={onReload} soporte={soporte} />
                </BasicModal>
            </>
    } else {
        <>
            <Button icon primary onClick={openVerSoporte}>
                <Icon name='eye' />
            </Button>
            <Button icon color='orange' onClick={openUpdateSoporte}>
                <Icon name='comments' />
            </Button>
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <SoporteComentarios close={onOpenCloseModal} onReload={onReload} soporte={soporte} />
            </BasicModal>
            <BasicModal show={showsecondModal} close={onOpenCloseSecondModal} title={titleModal}>
                <SoporteView close={onOpenCloseSecondModal} onReload={onReload} soporte={soporte} />
            </BasicModal>
        </>
    }

    return (
        <>
            <div className='ticket-item'>
                <div className='ticket-item__info'>
                    <h3 className='ticket-item__info-folio'>{soporte.folio}</h3>
                    <h4 className='ticket-item__info-servicio'>{soporte.servicio}</h4>
                    <span>Estatus: <Label className={`ticket-item__info-estado ${getStatusColor(soporte.estado)}`} >{soporte.estado}</Label></span>
                    <span>Prioridad: <Label className='ticket-item__info-prioridad' color={getStatusPrioridad}>{soporte.prioridad}</Label></span>
                    <span>Asignado: {soporte.asignado}</span>
                    <span>Creador: {soporte.dueno}</span>
                    <span>Fecha de Creación: {createdate}</span>
                    {descargaDocumentos}
                </div>
                {VistasporRole}
            </div>
        </>
    )
}
