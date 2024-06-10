import React, { useState } from 'react'
import { Button, Icon, Label } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import "./AsesorItem.scss";
import { AsesorView } from '../AsesorForm';
import { AsesorViewa } from '../AsesorForma';
import { AsesorViewb } from "../AsesorFormb"


export function AsesorItem(props) {
  const { mag, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const date = new Date(mag.created_at);
  const createdate = date.toLocaleDateString();
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openVerMag = () => {
    setTitleModal(`Revisar cotización: ${mag.folio}`);
    onOpenCloseModal();
  }

  const getStatusColor = (status) => status ? 'green' : 'orange';


  let contentView;
  if (mag.actividad === 'nueva') {
    contentView = <AsesorView onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
  } else if (mag.actividad === 'presentacion') {
    contentView = <AsesorViewa onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
  } else if (mag.actividad === 'cambio') {
    contentView = <AsesorViewb onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
  } else {
    contentView = <div>Error en sistema</div>
  }

  let vistaRapida;
  if (mag.actividad === 'nueva') {
    vistaRapida = <>    <span className='cotizacion-item__info-label'>Base:</span>
      <span className='cotizacion-item__info-valor'>{mag.base}</span><br />
      <span className='cotizacion-item__info-label'>Activos:</span>
      <span className='cotizacion-item__info-valor'>{mag.activos}</span></>
  } else if (mag.actividad === 'presentacion') {
    vistaRapida = <> <span className='cotizacion-item__info-label'>Clave Existente:</span>
      <span className='cotizacion-item__info-valor'>{mag.clave_ex}</span><br /></>
  } else if (mag.actividad === 'cambio') {
    vistaRapida = <>    <span className='cotizacion-item__info-label'>Clase Existente:</span>
      <span className='cotizacion-item__info-valor'>{mag.clave_ex}</span><br />
      <span className='cotizacion-item__info-label'>Base de Cambio:</span>
      <span className='cotizacion-item__info-valor'>{mag.base}</span></>
  }

  return (
    <>
      <div className='cotizacion-item'>
        <div className='column'>
          <p className='cotizacion-item__info'>
            <span className='cotizacion-item__info-label'>Cotización:</span>
            <span className='cotizacion-item__info-valor'>{mag.folio}</span><br />
            <span className='cotizacion-item__info-label'>Creado:</span>
            <span className='cotizacion-item__info-valor'>{createdate}</span>
          </p>
        </div>
        <div className='column'>
          <p className='cotizacion-item__info'>
            {vistaRapida}
          </p>
        </div>
        <div className='column'>
          <p className='cotizacion-item__info'>
            <span className='cotizacion-item__info-label'>Cliente:</span>
            <span className='cotizacion-item__info-valor'>{mag.cardcode}</span>
            <span className='cotizacion-item__info-valor'>{mag.cliente}</span>
          </p>
        </div>
        <div className='column'>
          <p className='cotizacion-item__info'>
            <label className='estatus_Id'>Estatus de Inv. y Desarollo: <Label className={`cotizacion-item__info-statusinde ${getStatusColor(mag.sIyD)}`}>
              {mag.sIyD ? 'Finalizado' : 'Pendiente'}
            </Label></label>
            {(mag.actividad === 'nueva' || mag.actividad === 'cambio') && (
              <label className='estatus_Ope'>Estatus de Operaciones: <Label className={`cotizacion-item__info-statusope ${getStatusColor(mag.sOp)}`}>
                {mag.sOp ? 'Finalizado' : 'Pendiente'}
              </Label></label>
            )}
            <label className='estatus_GC'>Estatus de Gestión Comercial: <Label className={`cotizacion-item__info-statusgcome ${getStatusColor(mag.sCom)}`}>
              {mag.sCom ? 'Finalizado' : 'Pendiente'}
            </Label></label>
          </p>
        </div>
        <div>
          <Button icon primary onClick={openVerMag}>
            <Icon name='eye' />
          </Button>
        </div>
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        {contentView}
      </BasicModal>
    </>
  )
}
