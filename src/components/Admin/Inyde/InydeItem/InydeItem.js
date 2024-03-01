import React, {useState} from 'react';
import "./Inyde.scss";
import { Button, Icon, Confirm } from 'semantic-ui-react';
import {ENV} from "../../../../utils";
import { BasicModal } from '../../../Shared';
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';

const magController = new Mag();

export function InydeItem(props) {
    const {mag, onReload, onClose} = props
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false)
    const onOpenCloseModal = ()=> setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = ()=> setShowConfirm((prevState) => !prevState);
    const openUpdateMag=()=>{
        setTitleModal(`Revisar cotizacion:`);
        onOpenCloseModal();
    }
  return (
    <>
    <div className='cotizacion-item'>
        <div className='cotizacion-item__info'>
            <span className='cotizacion-item__info-inyde'>{mag.folio_IyD}</span>
            <span className='cotizacion-item__info-inyde'>{mag.folio_Op}</span>
            <span className='cotizacion-item__info-inyde'>{mag.folio_sCom}</span>
        </div>
        <div>
            <Button icon primary>
                <Icon name='edit'/>
            </Button>
            <Button>
                <Icon name='trash alternate outline'/>
            </Button>
        </div>
    </div>
    </>
  )
}
