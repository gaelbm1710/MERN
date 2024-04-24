import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import { ListInydes, InydesForm } from '../../../components/Admin/Inyde';

export function Inydes() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onReload = () => setReload((prevState) => !prevState);
    const panes = [
        {
            render: () => (
                <Tab.Pane>
                    <ListInydes reload={reload} onReload={onReload}/>
                </Tab.Pane>
            )
        }
    ]
    return (
        <>
            <div className='presentacion-nueva'>
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
            <BasicModal showModal={showModal} close={onOpenCloseModal} title="Nueva Presentacion">
                <InydesForm close={onOpenCloseModal} onReload={onReload} />
            </BasicModal>
        </>
    )
}
