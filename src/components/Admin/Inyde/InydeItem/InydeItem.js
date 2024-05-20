import React, { useState } from 'react';
import "./Inyde.scss";
import { Button, Icon, Confirm, Label } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { InydeForm } from "../InydeForm";
import { InydesForm } from "../InydesForm";
import { InydessForm } from "../InydessForm";

const magController = new Mag();

export function InydeItem(props) {
    const { mag, onReload } = props;
    const date = new Date(mag.created_at);
    const createdate = date.toLocaleDateString();
    const { accessToken } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false)
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
    const openUpdateMag = () => {
        setTitleModal(`Revisar cotizacion: #${mag.folio}`);
        onOpenCloseModal();
    }
    /*
    const verMag = () => {
        setTitleModal(`Ver cotización: # ${mag.folio}`)
        onOpenCloseModal();
    }*/
    const onDelete = async () => {
        try {
            await magController.deleteMag(accessToken, mag._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }
    const getStatusColor = (status) => status ? 'green' : 'orange';
    let formview;
    if (mag.actividad === 'nueva') {
        formview = <InydeForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
    } else if (mag.actividad === 'presentacion') {
        formview = <InydesForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
    } else if (mag.actividad === 'cambio') {
        formview = <InydessForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
    } else {
        formview = <div>Error en sistema</div>
    }
    return (
        <>
            <div className='cotizacion-item'>
                <div className='cotizacion-item__info'>
                    <p className='cotizacion-item__info-dxp'>Folio: {mag.folio}</p>
                    <p className='cotizacion-item__info-dxp'>Folio In. y De.: {mag.folio_IyD}</p>
                    <p className='cotizacion-item__info-asesor'>Correo de Asesor: {mag.asesor}</p>
                    <p className='cotizacion-item__info-asesor'>CardCode: {mag.cardcode}</p>
                    <p className='cotizacion-item__info-asesor'>Nombre del cliente: {mag.cliente}</p>
                    <p className='cotizacion-item__info-actividad'>Actividad: {mag.actividad}</p>
                    <p className='cotizacion-item__info-actividad'>Fecha de Creación: {createdate}</p>
                    <Label className={`cotizacion-item__info-statusinde ${getStatusColor(mag.sIyD)}`}>
                        Estatus de Inv. y Desarollo: {mag.sIyD ? 'Finalizado' : 'Pendiente'}
                    </Label>
                    <Label className={`cotizacion-item__info-statusope ${getStatusColor(mag.sOp)}`}>
                        Estatus de Operaciones: {mag.sOp ? 'Finalizado' : 'Pendiente'}
                    </Label>
                    <Label className={`cotizacion-item__info-statusgcome ${getStatusColor(mag.sCom)}`}>
                        Estatus de Gestión Comercial: {mag.sCom ? 'Finalizado' : 'Pendiente'}
                    </Label>
                </div>
                <div>
                    <Button icon primary onClick={openUpdateMag}>
                        <Icon name='edit' />
                    </Button>
                    <Button icon color='red' onClick={onOpenCloseConfirm}>
                        <Icon name='trash alternate outline' />
                    </Button>
                </div>
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                {formview}
            </BasicModal>
            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`Eliminar la cotización: #${mag.folio}`}
                size='mini'
            />
        </>
    )
}


