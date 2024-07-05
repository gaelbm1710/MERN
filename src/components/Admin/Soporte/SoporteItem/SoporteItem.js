import React, { useState } from 'react'
import "./SoporteItem.scss";
import { Button, Icon } from "semantic-ui-react";
import { BasicModal } from '../../../Shared';
import { SoporteForm, SoporteView } from '../SoporteForm';
import { SoporteAsignar } from '../SoporteAsignar'
import { SoporteComentarios } from '../SoporteComentarios';
import { useAuth } from "../../../../hooks";
import { ENV } from '../../../../utils';


export function SoporteItem(props) {
    const { soporte, onReload, close } = props;
    const { user: { role } } = useAuth();
    const [showsecondModal, setshowsecondModal] = useState(false);
    const [showthirdModal, setshowthirdModal] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const onOpenCloseModal = () => setshowModal((prevState) => !prevState);
    const onOpenCloseSecondModal = () => setshowsecondModal((prevState) => !prevState);
    const onOpenCloseThirdModal = () => setshowthirdModal((prevState) => !prevState);
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
    const isSist = role === "sistemas";

    const documentosUrl = soporte.documentos ? `${ENV.TICKETSOPORTE}/${soporte.documentos}` : 'No agrego Documentos'

    let descargaDocumentos;
    if (documentosUrl === 'No agrego Documentos') {
        descargaDocumentos = <span>No agregó Documento</span>
    } else {
        descargaDocumentos = <span>Descarga Documentos<Button icon primary href={documentosUrl} download={soporte.documentos}><Icon name='download' /></Button></span>
    }

    return (
        <>
            <div className='ticket-item'>
                <div className='ticket-item__info'>
                    <h3>{soporte.folio}</h3>
                    <h4>{soporte.servicio}</h4>
                    <span>Estatus: {soporte.estado}</span>
                    <span>Asignado: {soporte.asignado}</span>
                    <span>Creador: {soporte.dueno}</span>
                    {descargaDocumentos}
                </div>
                <Button icon primary onClick={openVerSoporte}>
                    <Icon name='eye' />
                </Button>
                <Button icon primary onClick={openUpdateSoporte}>
                    <Icon name='comments' />
                </Button>
                <Button icon primary onClick={openAsignarTicket}>
                    <Icon name='users' />
                </Button>
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <SoporteComentarios close={onOpenCloseModal} onReload={onReload} soporte={soporte} />
            </BasicModal>
            <BasicModal show={showsecondModal} close={onOpenCloseSecondModal} title={titleModal}>
                <SoporteView close={onOpenCloseSecondModal} onReload={onReload} soporte={soporte} />
            </BasicModal>
            <BasicModal show={showthirdModal} close={onOpenCloseThirdModal} title={titleModal}>
                <SoporteAsignar close={onOpenCloseThirdModal} onReload={onReload} soporte={soporte} />
            </BasicModal>
        </>
    )
}
