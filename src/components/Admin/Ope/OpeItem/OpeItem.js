import React, { useState } from 'react'
import "./OpeItem.scss";
import { Button, Icon, Label } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { OpeForm } from "../OpeForm"
import { OpesForm } from "../OpesForm"
import { OpessForm } from "../OpessForm"


export function OpeItem(props) {
  const { mag, onReload } = props
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const date = new Date(mag.created_at);
  const createdate = date.toLocaleDateString();
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openUpdateMag = () => {
    setTitleModal(`Revisar cotización: ${mag.folio}`)
    onOpenCloseModal();
  }
  const getStatusColor = (status) => status ? 'green' : 'orange';

  let formview;
  if (mag.actividad === 'nueva') {
    formview = <OpeForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
  } else if (mag.actividad === 'presentacion') {
    formview = <OpesForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
  } else if (mag.actividad === 'cambio') {
    formview = <OpessForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />;
  } else {
    formview = <div>Error en sistema</div>
  }


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
            <span className='cotizacion-item__info-valor'>{mag.asesornom}</span>
            <span className='cotizacion-item__info-valor'>{mag.asesor}</span><br />
            <span className='cotizacion-item__info-label'>Medico:</span>
            <span className='cotizacion-item__info-valor'>{mag.cardcode}</span><br />
            <span className='cotizacion-item__info-valor'>{mag.cliente}</span><br />
            <span className='cotizacion-item__info-label'>Activos:</span>
            <span className='cotizacion-item__info-valor'>{mag.activos}</span>
          </p>
        </div>
        <div className='column'>
          <p className='cotizacion-item__info'>
            <span className='cotizacion-item__info-label'>Folio Operaciones:</span>
            <span className='cotizacion-item__info-valor'>{mag.folio_Op}</span><br />
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
        <div>
          <Button icon primary onClick={openUpdateMag}>
            <Icon name='edit' />
          </Button>
        </div>
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <OpeForm onClose={onOpenCloseModal} onReload={onReload} mag={mag} />
      </BasicModal>
    </>
  )
}
