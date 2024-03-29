import React, {useState} from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { useAuth } from '../../../../hooks';
import { Mag } from '../../../../api';
import { AsesorForm } from '../AsesorForm/AsesorForm';
import "./AsesorItem.scss";

const magController = new Mag();

export function AsesorItem(props) {
  const {mag, onReload, onClose} = props;
  const {accessToken} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const dxp = mag._id.substring(24,18);
  const onOpenCloseModal = ()=>setShowModal((prevState)=>!prevState);
  const openUpdareMag=()=>{
    setTitleModal(`Revisar cotización: #${dxp}`);
    onOpenCloseModal();
  }
  return (
    <>
    <div className='cotizacion-item'>
      <div className='cotizacion-item__info'>
       <p>Cotización: <span className='cotizacion-item__info-dxp'># {dxp}</span></p> 
       <p>Cliente: <span className='cotizacion-item__info-cliente'>{mag.cardcode}</span></p>
       <p>Actividad: <span className='cotizacion-item__info-cliente'>{mag.actividad}</span></p>
      </div>
      <div>
        <Button icon primary onClick={openUpdareMag}>
          <Icon name='eye'/>
        </Button>
      </div>
    </div>
    <BasicModal showModal={showModal} close={onOpenCloseModal} title={titleModal}>
      <AsesorForm onClose={onOpenCloseModal} onReload={onReload} mag={mag}/>
    </BasicModal>
    </>
  )
}
