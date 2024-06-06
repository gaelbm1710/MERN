import React, { useState } from 'react';
import "./Users.scss";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUsers } from "../../../components/Admin/Users";

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState)
  const onReload = () => setReload((prevState) => !prevState);
  const panes = [{
    menuItem: "Usuarios Activos",
    render: () => (
      <Tab.Pane attached={false}>
        <ListUsers usersActive={true} reload={reload} onReload={onReload} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Usuarios Inactivos",
    render: () => (
      <Tab.Pane attached={false}>
        <ListUsers usersActive={false} reload={reload} onReload={onReload} />
      </Tab.Pane>
    ),
  },
  ];

  return (
    <>
      <div className='users-page'>
        <Button className='users-page__add' primary onClick={onOpenCloseModal}>Nuevo Usuario</Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} tittle="Crear nuevo usuario">
        <UserForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  )
}
