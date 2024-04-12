import React, {useState} from 'react'
import {Tab, Button} from "semantic-ui-react";
import { BasicModal } from '../../../components/Shared';
import { ListSoporte } from '../../../components/Admin/Soporte/ListSoporte';
import { SoporteForm } from '../../../components/Admin/Soporte/SoporteForm';

export function Soporte() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);
    const onOpenCloseModal = () =>setShowModal((prevState) => !prevState);
    const onReload = () => setReload((prevState) => !prevState);
    //const isSist = role === "sistemas";

    const panes = [
        {
            render: ()=>(
                <Tab.Pane attached={false}>
                    <ListSoporte reload={reload} onReload={onReload}/>
                </Tab.Pane>
            )
        }
    ];
    

  return (
    <>
    <div className='tickets-page'>
        <div className='tickets-page'>
            <Button primary onClick={onOpenCloseModal}>
                Nuevo Ticket
            </Button>
        </div>
        <Tab menu={{secondary: true}} panes={panes} />
    </div>
    <BasicModal show={showModal} close={onOpenCloseModal} title="Agregar Ticket">
        <SoporteForm onClose={onOpenCloseModal} onReload={onReload} />
    </BasicModal>
    </>
  )
}
