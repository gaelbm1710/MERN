import React, { useState } from 'react'
import "./ComeItem.scss";
import { Button, Icon, Confirm, Label } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ComeForm } from "../ComeForm";
import { ComesForm } from "../ComesForm";
import { ComessForm } from "../ComessForm";

const magController = new Mag();

export function ComeItem(props) {
  const { mag, onReload } = props
  const date = new Date(mag.created_at);
  const createdate = date.toLocaleDateString();
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false)
  const dxp = mag._id.substring(24, 18);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  const openUpdateMag = () => {
    setTitleModal(`Revisar cotización: #${dxp}`)
    onOpenCloseModal();
  }
  const verMag = () => {
    setTitleModal(`Ver cotización: # ${mag.folio}`)
    onOpenCloseModal();
  }

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


  return (
    <>
      <div className='cotizacion-item'>
        <div className='column'>
          <p className='cotizacion-item__info'>
            <span className='cotizacion-item__info-label'>Folio:</span>
            <span className='cotizacion-item__info-valor'>{mag.folio}</span><br />
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
            <span className='cotizacion-item__info-valor'>{mag.cliente}</span><br />
            <span className='cotizacion-item__info-label'>Activos:</span>
            <span className='cotizacion-item__info-valor'>{mag.activos}</span>
          </p>
        </div>
        <div className='column'>
          <p className='cotizacion-item__info'>
            <span className='cotizacion-item__info-label'>Folio COME:</span>
            <span className='cotizacion-item__info-valor'>{mag.folio_sCom}</span><br />
            <Label className={`cotizacion-item__info-statusinde ${getStatusColor(mag.sIyD)}`}>
              Estatus de Inv. y Desarollo: {mag.sIyD ? 'Finalizado' : 'Pendiente'}
            </Label>
            <Label className={`cotizacion-item__info-statusope ${getStatusColor(mag.sOp)}`}>
              Estatus de Operaciones: {mag.sOp ? 'Finalizado' : 'Pendiente'}
            </Label>
            <Label className={`cotizacion-item__info-statusgcome ${getStatusColor(mag.sCom)}`}>
              Estatus de Gestión Comercial: {mag.sCom ? 'Finalizado' : 'Pendiente'}
            </Label>
          </p>
        </div>
        <div className='button-container'>
          <Button icon primary onClick={openUpdateMag}>
            <Icon name='edit' />
          </Button>
        </div>
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <ComeForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />
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
