import React, {useState} from 'react'
import { Button, Icon, Label } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import "./AsesorItem.scss";
import { AsesorView } from '../AsesorForm';
import { AsesorViewa } from '../AsesorForma';
import { AsesorViewb } from "../AsesorFormb"


export function AsesorItem(props) {
  const {mag, onReload} = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const date = new Date(mag.created_at);
  const createdate = date.toLocaleDateString();
  const onOpenCloseModal = ()=>setShowModal((prevState)=>!prevState);
  const openVerMag=()=>{
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
  }else{
    contentView = <div>Error en sistema</div>
  }

  return (
    <>
    <div className='cotizacion-item'>
      <div className='cotizacion-item__info'>
       <p>Cotización: <span className='cotizacion-item__info-dxp'>{mag.folio}</span></p> 
       <p>Cliente: <span className='cotizacion-item__info-cliente'>{mag.cardcode}</span></p>
       <p>Actividad: <span className='cotizacion-item__info-cliente'>{mag.actividad}</span></p>
       <p>Fecha de Creacion: <span className='cotizacion-item__info-cliente'>{createdate}</span></p>
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
        <Button icon primary onClick={openVerMag}>
          <Icon name='eye'/>
        </Button>
      </div>
    </div>
    <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
      {contentView}
    </BasicModal>
    </>
  )
}
