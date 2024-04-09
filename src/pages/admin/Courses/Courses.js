import React, {useState} from 'react';
import {Tab, Button} from "semantic-ui-react";
import "./Courses.scss";
import {BasicModal} from "../../../components/Shared";
import {ListCourses, CourseForm} from "../../../components/Admin/Course";

export function Courses() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState)=> !prevState);
  const onReload = () => setReload((prevState)=> !prevState);

  const panes = [
    {
      render: () =>(
        <Tab.Pane attached={false}>
          <ListCourses reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    }
  ];


  return (
    <>
      <div className='courses-page'>
        <div className='courses-page__add'>
          <Button primary onClick={onOpenCloseModal}>
            Nuevo Enlace
          </Button>
        </div>
        <Tab menu={{secondary: true}} panes={panes}/>
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title="Agregar Enlace" >
        <CourseForm onClose={onOpenCloseModal} onReload={onReload}/>
      </BasicModal>
    </>
  )
}
