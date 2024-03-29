import React, {useState} from 'react'
import { BasicModal } from '../../../components/Shared'
import { Button, Tab } from 'semantic-ui-react'
import "./asesor.scss";
import {AsesorForm, ListAsesor, AsesorForma, AsesorFormb} from "../../../components/Admin/Asesor"

export function Asesor() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [modalType, setModalType] = useState(null);
  const onOpenCloseModal = (type) => { 
    setShowModal(prevState => !prevState);
    setModalType(type);
  };  
  const onReload = () => setReload((prevState) => !prevState);
  const panes=[
    {
      menuItem: "Nueva Cotización",
      render: () => (
        <Tab.Pane attached={false}>
          <ListAsesor actividad="nueva" reload={reload} onReload={onReload} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Alta de Presentación",
      render: () => (
        <Tab.Pane attached={false}>
          <ListAsesor actividad="agregar" reload={reload} onReload={onReload} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Cambio de Base",
      render: () => (
        <Tab.Pane attached={false}>
          <ListAsesor actividad="cambio" reload={reload} onReload={onReload} />
        </Tab.Pane>
      )
    }
  ]
  return (
    <>
      <div className='cotizacion-page'>
        <Button className='cotizacion-page__new' value="nueva" primary onClick={()=> onOpenCloseModal('nueva')}>Nueva Cotización</Button>
        <Button className='cotizacion-page__add' value="agregar" primary onClick={()=> onOpenCloseModal('agregar')}>Alta de Presentación</Button>
        <Button className='cotizacion-page__add' value="cambio" primary onClick={()=> onOpenCloseModal('cambio')}>Cambio de Base</Button>
        <Tab menu={{secondary: true}} panes={panes}/> {" "}
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title={modalType === 'nueva' ? 'Crear cotización': modalType === 'agregar' ? 'Alta Presentación' : 'Cambio Base'}>
      {modalType === 'nueva' && <AsesorForm onClose={onOpenCloseModal} onReload={onReload} />}
      {modalType === 'agregar' && <AsesorForma onClose={onOpenCloseModal} onReload={onReload}/>}
      {modalType === 'cambio' && <AsesorFormb onClose={onOpenCloseModal} onReload={onReload} />}
      </BasicModal>
    </>
  )
}
