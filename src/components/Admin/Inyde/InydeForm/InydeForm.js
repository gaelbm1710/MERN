import React from 'react'
import {Form, Dropdown, Input, Container} from "semantic-ui-react";
import { useFormik } from 'formik';
import {initialValues, validationSchema} from "./InydeForm.form"
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';

const magController = new Mag();

const clasificacion = [
  {key: "FM", Text:"FM", value:"fm"},
  {key: "DC", Text:"DC", value:"dc"}
];

const TipoF = [
  {key: "Cerrada", Text:"Cerrada", value:"cd"},
  {key: "Atributos", Text:"Atributos", value:"at"}
];


export function InydeForm(props) {
  const {onClose, onReload, mag} = props;
  const dxp = mag._id.substring(24,18);
  const {accessToken} = useAuth();
  const formik = useFormik({
    initialValues: initialValues(mag),
    validationSchema: validationSchema(mag),
    validateOnChange: false,
    onSubmit: async(formValue)=>{
      try {
        if(!mag){
          await magController.createMag(accessToken, formValue);
        }else{
          await magController.updateMag(accessToken, mag._id, formValue);
        }
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  });
  return (
    <Form className='form-iynde' onSubmit={formik.handleSubmit}>
    <Form.Group className='form-iynde__asesor' widths='equal'>
      <Form.TextArea name="activos" placeholder="activos" onChange={formik.handleChange} value={formik.values} error={formik.errors.activos}/>
    </Form.Group>
    <Form.Input name='folio_IyD'/>
    </Form>
  )
}
