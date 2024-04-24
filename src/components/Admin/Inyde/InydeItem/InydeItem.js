import React, {useState} from 'react';
import "./Inyde.scss";
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import {InydeForm} from "../InydeForm";
import {InydesForm} from "../InydesForm";
import {InydessForm} from "../InydessForm";

const magController = new Mag();

export function InydeItem(props) {
    const {mag, onReload} = props
    const {accessToken} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false)
    const dxp = mag._id.substring(24,18);
    const onOpenCloseModal = ()=> setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = ()=> setShowConfirm((prevState) => !prevState);
    const openUpdateMag=()=>{
        setTitleModal(`Revisar cotizacion: #${dxp}`);
        onOpenCloseModal();
    }
    const onDelete = async () =>{
        try {
            await magController.deleteMag(accessToken, mag._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }
    let formview;
    if (mag.actividad === 'nueva') {
        formview = <InydeForm onClose={onOpenCloseModal} onReload={onReload} mag={mag}/>;
    } else if (mag.actividad === 'presentacion') {
        formview = <InydesForm onClose={onOpenCloseModal} onReload={onReload} mag={mag}/>;
    } else if (mag.actividad === 'cambio') {
        formview = <InydessForm onClose={onOpenCloseModal} onReload={onReload} mag={mag}/>;
        formview = <div>Error en sistema</div>
    }
  return (
    <>
    <div className='cotizacion-item'>
        <div className='cotizacion-item__info'>
            <p className='cotizacion-item__info-inyde'>Cotizacion:</p>
            <p className='cotizacion-item__info-dxp'>#{mag.folio}</p>
        </div>
        <div>
            <Button icon primary onClick={openUpdateMag}>
                <Icon name='edit'/>
            </Button>
            <Button icon color='red' onClick={onOpenCloseConfirm}>
                <Icon name='trash alternate outline'/>
            </Button>
        </div>
    </div>
    <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        {formview}
    </BasicModal>
    <Confirm 
    open={showConfirm}
    onCancel={onOpenCloseConfirm}
    onConfirm={onDelete}
    content={`Eliminar la cotización: #${dxp}`}
    size='mini'
    />
    </>
  )
}


