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
<<<<<<< HEAD
            <div className='column'>
                        <p className='cotizacion-item__info'>
                            <span className='cotizacion-item__info-label'>Folio:</span>
                            <span className='cotizacion-item__info-valor'>{mag.folio}</span><br />
                            <span className='cotizacion-item__info-label'>Folio In. y De.:</span>
                            <span className='cotizacion-item__info-valor'>{mag.folio_IyD}</span><br />
                            <span className='cotizacion-item__info-label'>Creado:</span>
                            <span className='cotizacion-item__info-valor'>{createdate}</span>
                        </p>
                    </div>
                    <div className='column'>
                        <p className='cotizacion-item__info'>
                            <span className='cotizacion-item__info-label'>Asesor:</span>
                            <span className='cotizacion-item__info-valor'>{mag.asesor}</span><br />
                            <span className='cotizacion-item__info-label'>Medico:</span>
                            <span className='cotizacion-item__info-valor'>{mag.cardcode}</span>
                            <span className='cotizacion-item__info-valor'>{mag.cliente}</span>
                        </p>
                    </div>
                    <div className='column'>
                        <p className='cotizacion-item__info'>
                            <span className='cotizacion-item__info-label'>Base:</span>
                            <span className='cotizacion-item__info-valor'>{mag.base}</span><br/>
                            <span className='cotizacion-item__info-label'>Activos:</span>
                            <span className='cotizacion-item__info-valor'>{mag.activos}</span>
                        </p>
                    </div>
                    <div className='column'>
                    <p className='cotizacion-item__info'>
                             <label className='estatus_Id'>Estatus de Inv. y Desarollo: <Label className={`cotizacion-item__info-statusinde ${getStatusColor(mag.sIyD)}`}>
                                {mag.sIyD ? 'Finalizado' : 'Pendiente'}
                            </Label></label>
                            <label className='estatus_Ope'>Estatus de Operaciones: <Label className={`cotizacion-item__info-statusope ${getStatusColor(mag.sOp)}`}>
                                {mag.sOp ? 'Finalizado' : 'Pendiente'}
                            </Label></label>
                            <label className='estatus_GC'>Estatus de Gestión Comercial: <Label className={`cotizacion-item__info-statusgcome ${getStatusColor(mag.sCom)}`}>
                                {mag.sCom ? 'Finalizado' : 'Pendiente'}
                            </Label></label>
                        </p>
                    </div>
                <div className='button-container'>
=======
                <div className='cotizacion-item__info'>
                    <p className='cotizacion-item__info-dxp'>Folio: {mag.folio}</p>
                    <p className='cotizacion-item__info-dxp'>Folio In. y De.: {mag.folio_IyD}</p>
                    <p className='cotizacion-item__info-asesor'>Asesor: {mag.asesornom}</p>
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
>>>>>>> f6513af (Cambios  21/05/2024 9:14)
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


