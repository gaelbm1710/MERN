import React, { useState } from 'react';
import "./Inyde.scss";
import { Button, Icon, Label } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { InydeForm, InydeView } from "../InydeForm";
import { InydesForm, InydesView } from "../InydesForm";
import { InydessForm, InydessView } from "../InydessForm";
import { InydeFormCancel } from "../InydeFormCancel";

export function InydeItem(props) {
    const { mag, onReload } = props;
    const date = new Date(mag.created_at);
    const createdate = date.toLocaleDateString();
    const [showModal, setShowModal] = useState(false);
    const [showsecondModal, setShowsecondModal] = useState(false);
    const [showshowModal, setshowshowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("");
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseSecondModal = () => setShowsecondModal((prevState) => !prevState);
    const onOpenCloseShowModal = () => setshowshowModal((prevState) => !prevState);
    const openUpdateMag = () => {
        setTitleModal(`Revisar cotización: ${mag.folio}`);
        onOpenCloseModal();
    }
    const openCancelMag = () => {
        setTitleModal(`Cancelar cotización: ${mag.folio}`);
        onOpenCloseSecondModal();
    }
    const openVerMag = () => {
        setTitleModal(`Cotizacion: ${mag.folio}`)
        onOpenCloseShowModal();
    }
    const getStatusColor = (status) => {
        switch (status) {
            case 'Finalizado':
                return 'green';
            case 'Pendiente':
                return 'orange';
            case 'Cancelado':
                return 'red';
            default:
                return 'green';
        }
    };

    let getStatusGeneralColor;
    if (mag.StatusGeneral === 'Pendiente') {
        getStatusGeneralColor = 'orange';
    } else if (mag.StatusGeneral === 'Cancelado') {
        getStatusGeneralColor = 'red';
    } else if (mag.StatusGeneral === 'Finalizado') {
        getStatusGeneralColor = 'green';
    }

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

    let sIyD = mag.sIyD, sOp = mag.sOp, sCom = mag.sCom;

    if (mag.StatusGeneral !== 'Cancelado') {
        sIyD = mag.sIyD ? 'Finalizado' : 'Pendiente';
        sOp = mag.sOp ? 'Finalizado' : 'Pendiente';
        sCom = mag.sCom ? 'Finalizado' : 'Pendiente';
    } else {
        sIyD = 'Cancelado';
        sOp = 'Cancelado';
        sCom = 'Cancelado';
    }


    let estatusviews;
    if (mag.actividad === 'nueva' || mag.actividad === 'cambio') {
        estatusviews =
            <>
                <label className='estatus_gn'>Estatus General: <Label className={`cotizacion-item__info-statusinde`} color={getStatusGeneralColor}>{mag.StatusGeneral}</Label></label>
                <label className='estatus_Id'>Estatus de Inv. y Desarollo: <Label className={`cotizacion-item__info-statusinde ${getStatusColor(sIyD)}`}>{sIyD}</Label></label>
                <label className='estatus_Ope'>Estatus de Operaciones: <Label className={`cotizacion-item__info-statusope ${getStatusColor(sOp)}`}>{sOp}</Label></label>
                <label className='estatus_GC'>Estatus de Gestión Comercial: <Label className={`cotizacion-item__info-statusgcome ${getStatusColor(sCom)}`}>{sCom}</Label></label>
            </>
    } else if (mag.actividad === 'presentacion') {
        estatusviews =
            <>
                <label className='estatus_gn'>Estatus General: <Label className={`cotizacion-item__info-statusinde`} color={getStatusGeneralColor}>{mag.StatusGeneral}</Label></label>
                <label className='estatus_Id'>Estatus de Inv. y Desarollo: <Label className={`cotizacion-item__info-statusinde ${getStatusColor(sIyD)}`}>{sIyD}</Label></label>
                <label className='estatus_GC'>Estatus de Gestión Comercial: <Label className={`cotizacion-item__info-statusgcome ${getStatusColor(sCom)}`}>{sCom}</Label></label>
            </>
    }

    let botonesviews;
    if (mag.StatusGeneral === 'Pendiente' && mag.sIyD === false) {
        botonesviews = <><Button icon primary onClick={openUpdateMag}><Icon name='edit' /></Button><Button icon color='red' onClick={openCancelMag}><Icon name='trash alternate outline' /></Button></>
    } else {
        botonesviews = <><Button icon primary onClick={openVerMag}><Icon name='eye' /></Button></>
    }

    let vistaRapida;
    if (mag.actividad === 'nueva') {
        vistaRapida = <>    <span className='cotizacion-item__info-label'>Base:</span>
            <span className='cotizacion-item__info-valor'>{mag.base}</span><br />
            <span className='cotizacion-item__info-label'>Activos:</span>
            <span className='cotizacion-item__info-valor'>{mag.activos}</span><br />
            <span className='cotizacion-item__info-label'>Muestra:</span>
            <span className='cotizacion-item__info-valor'>{mag.necesita_muestra ? 'Sí' : 'No'}</span></>
    } else if (mag.actividad === 'presentacion') {
        vistaRapida = <> <span className='cotizacion-item__info-label'>Clave Existente:</span>
            <span className='cotizacion-item__info-valor'>{mag.clave_ex}</span><br />
            <span className='cotizacion-item__info-label'>Presentaciones:</span>
            <span className='cotizacion-item__info-valor'>{mag.presentacion}</span>
            </>

    } else if (mag.actividad === 'cambio') {
        vistaRapida = <>    <span className='cotizacion-item__info-label'>Clave Existente:</span>
            <span className='cotizacion-item__info-valor'>{mag.clave_ex}</span><br />
            <span className='cotizacion-item__info-label'>Base de Cambio:</span>
            <span className='cotizacion-item__info-valor'>{mag.base}</span><br />
            <span className='cotizacion-item__info-label'>Muestra:</span>
            <span className='cotizacion-item__info-valor'>{mag.necesita_muestra ? 'Sí' : 'No'}</span></>
    }

    let contentView;
    if (mag.actividad === 'nueva') {
        contentView = <InydeView onClose={onOpenCloseShowModal} onReload={onReload} mag={mag} />
    } else if (mag.actividad === 'presentacion') {
        contentView = <InydesView onClose={onOpenCloseShowModal} onReload={onReload} mag={mag} />
    } else if (mag.actividad === 'cambio') {
        contentView = <InydessView onClose={onOpenCloseShowModal} onReload={onReload} mag={mag} />
    } else {
        contentView = <div>Error en sistema</div>
    }

    return (
        <>
            <div className='cotizacion-item'>
                <div className='column'>
                    <div className='cotizacion-item__info'>
                        <span className='cotizacion-item__info-label'>Folio:</span>
                        <span className='cotizacion-item__info-valor'>{mag.folio}</span><br />
                        <span className='cotizacion-item__info-label'>Folio In. y De.:</span>
                        <span className='cotizacion-item__info-valor'>{mag.folio_IyD}</span><br />
                        <span className='cotizacion-item__info-label'>Creado:</span>
                        <span className='cotizacion-item__info-valor'>{createdate}</span>
                    </div>
                </div>
                <div className='column'>
                    <div className='cotizacion-item__info'>
                        <span className='cotizacion-item__info-label'>Asesor:</span>
                        <span className='cotizacion-item__info-valor'>{mag.asesornom}</span>
                        <span className='cotizacion-item__info-valor'>{mag.asesor}</span><br />
                        <span className='cotizacion-item__info-label'>Medico:</span>
                        <span className='cotizacion-item__info-valor'>{mag.cardcode}</span>
                        <span className='cotizacion-item__info-valor'>{mag.cliente}</span>
                    </div>
                </div>
                <div className='column'>
                    <div className='cotizacion-item__info'>
                        {vistaRapida}
                    </div>
                </div>
                <div className='column'>
                    <div className='cotizacion-item__info'>
                        {estatusviews}
                    </div>
                </div>
                <div className='button-container'>
                    {botonesviews}
                </div>
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                {formview}
            </BasicModal>
            <BasicModal show={showsecondModal} close={onOpenCloseSecondModal} title={titleModal}>
                <InydeFormCancel onClose={onOpenCloseSecondModal} onReload={onReload} mag={mag} />
            </BasicModal>
            <BasicModal show={showshowModal} close={onOpenCloseShowModal} title={titleModal}>
                {contentView}
            </BasicModal>
        </>
    )
}
