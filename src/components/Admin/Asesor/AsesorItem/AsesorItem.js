import React, {useState} from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { useAuth } from '../../../../hooks';
import { Mag } from '../../../../api';
import { AsesorForm } from '../AsesorForm/AsesorForm';

const magController = new Mag();

export function AsesorItem(props) {
  const {mag, onReload, onClose} = props;
  const {accessToken} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const dxp = mag._id.substring(24,18);
  const onOpenCloseModal = ()=>setShowModal((prevState)=>!prevState);
  return (
    <>
    <div className='cotizacion-item'>
      <div className='cotizacion-item__info'>
        <span className='cotizacion-item__info-dxp'># {dxp}</span>
        <span className='cotizacion-item__info-fecha'>{mag.created_at}</span>
      </div>
    </div>
    <BasicModal showModal={showModal} close={onOpenCloseModal} title={titleModal}>
      <AsesorForm onClose={onOpenCloseModal} onReload={onReload} mag={mag}/>
    </BasicModal>
    </>
  )
}
