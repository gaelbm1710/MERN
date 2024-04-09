import React, {useState} from 'react'
import { Button, Icon } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import "./AsesorItem.scss";
import { AsesorView } from '../AsesorForm';
import { AsesorViewa } from '../AsesorForma';
import { AsesorViewb } from "../AsesorFormb"


export function AsesorItem(props) {
  const {mag, onReload} = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const dxp = mag._id.substring(24,18);
  const onOpenCloseModal = ()=>setShowModal((prevState)=>!prevState);
  const openVerMag=()=>{
    setTitleModal(`Revisar cotización: #${dxp}`);
    onOpenCloseModal();
  }

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
       <p>Cotización: <span className='cotizacion-item__info-dxp'># {dxp}</span></p> 
       <p>Cliente: <span className='cotizacion-item__info-cliente'>{mag.cardcode}</span></p>
       <p>Actividad: <span className='cotizacion-item__info-cliente'>{mag.actividad}</span></p>
       <p>Asesor: <span className='cotizacion-item__info-cliente'>{mag.asesor}</span></p>
       <p>Fecha de Creacion: <span className='cotizacion-item__info-cliente'>{mag.created_at}</span></p>
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
