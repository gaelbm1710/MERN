import React, { useState } from 'react'
import "./OpeItem.scss";
import { Button, Icon } from 'semantic-ui-react';
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
        <div className='cotizacion-item'>
          <p className='cotizacion-item__info-dxp'>Folio: {mag.folio}</p>
          <p className='cotizacion-item__info-dxp'>Folio In. y De.: {mag.folio_IyD}</p>
          <p className='cotizacion-item__info-asesor'>Correo de Asesor: {mag.asesor}</p>
          <p className='cotizacion-item__info-asesor'>CardCode: {mag.cardcode}</p>
          <p className='cotizacion-item__info-asesor'>Nombre del cliente: {mag.cliente}</p>
          <p className='cotizacion-item__info-actividad'>Actividad: {mag.actividad}</p>
          <p className='cotizacion-item__info-actividad'>Fecha de Creación: {createdate}</p>
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
