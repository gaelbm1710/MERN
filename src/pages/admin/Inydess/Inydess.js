import React, {useState} from 'react'
import { Tab } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import {ListInydess, InydessForm} from "../../../components/Admin/Inyde"

export function Inydess() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);
  const panes = [
      {
          render: () => (
              <Tab.Pane>
                  <ListInydess reload={reload} onReload={onReload}/>
              </Tab.Pane>
          )
      }
  ]
  return (
      <>
          <div className='presentacion-nueva'>
              <Tab menu={{ secondary: true }} panes={panes} />
          </div>
          <BasicModal showModal={showModal} close={onOpenCloseModal} title="Cambio de Base">
              <InydessForm close={onOpenCloseModal} onReload={onReload} />
          </BasicModal>
      </>
  )
}
