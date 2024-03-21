import React from 'react'
import {Form, FormCheckbox, Checkbox, Input, FormButton, Dropdown, FormInput, FormGroup} from "semantic-ui-react";
import { FormikConsumer, useFormik } from 'formik';
import {initialValues, validationSchema} from "./InydeForm.form"
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { getValue } from '@testing-library/user-event/dist/utils';

const magController = new Mag();


const clasificacion = [
  {key:"FM", text:"FM", value:"FM"},
  {key:"DC", text:"DC", value:"DC"}
];

const TipoF = [
  {key:"Cerrada", text:"Cerrada", value:"cd"},
  {key:"Atributos", text:"Atributos", value:"at"}
];


export function InydeForm(props) {
  const {onClose, onReload, mag} = props;
 // const dxp = mag._id.substring(24,18);
  const {accessToken} = useAuth();
  const formik = useFormik({
    initialValues: initialValues(mag),
    validationSchema: validationSchema(mag),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data={
          folio_IyD: formValue.folio_IyD,
          cardcode: formValue.cardcode,
          base: formValue.base,
          activos: formValue.activos,
          especialidad: formValue.especialidad,
          padecimiento: formValue.padecimiento,
          necesita_muestra: formValue.necesita_muestra,
          existe: formValue.existe,
          base_ex: formValue.base_ex,
          clave_ex: formValue.clave_ex,
          clasi: formValue.clasi,
          receta: formValue.receta,
          refri: formValue.refri,
          infoDes: formValue.infoDes,
          tipoF: formValue.tipoF,
          caducidad: formValue.caducidad,
          comInt: formValue.comInt,
          excl: formValue.excl,
          presentacion: formValue.presentacion,
          comClie: formValue.comClie,
          asesor: formValue.asesor,
        }
        if(!mag){
          await magController.createMag(accessToken, data);
        }else{
          await magController.updateMag(accessToken, mag._id, data);
        }
        onClose();
        onReload();
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup widths='equal'>
        <Form.Input name="folio_IyD" label="ID" onChange={formik.handleChange} value={formik.values.folio_IyD} error={formik.errors.folio_IyD}/>
        <Form.Input name="asesor" label="Asesor" onChange={formik.handleChange} value={formik.values.asesor} error={formik.errors.asesor}/>
      </FormGroup>
      <FormGroup widths='equal'>
        <Form.Input name="cardcode" label="Médico" onChange={formik.handleChange} value={formik.values.cardcode} error={formik.errors.cardcode}/>
        <Form.Checkbox name='necesita_muestra' label="Necesita muestra" onChange={(_,data)=>formik.setFieldValue("necesita_muestra",data.checked)} checked={formik.values.necesita_muestra} error={formik.errors.necesita_muestra}/>
      </FormGroup>
      <FormGroup widths='equal'>
        <Form.Input name="activos" label="Activos" onChange={formik.handleChange} value={formik.values.activos} error={formik.errors.activos}/>
        <Form.Input name="base" label="Base" onChange={formik.handleChange} value={formik.values.base} error={formik.errors.base}/>
      </FormGroup>
      <FormGroup widths='equal'>
        <Form.Input name="especialidad" label="Especialidad" onChange={formik.handleChange} value={formik.values.especialidad} error={formik.errors.especialidad}/>
        <Dropdown placeholder="clasificacion" fluid selection options={clasificacion} onChange={(_,data)=>formik.setFieldValue("clasi",data.value)} value={formik.values.clasi} error={formik.errors.clasi}/>      
        <Form.Input name="padecimiento" label="Padecimiento" onChange={formik.handleChange} value={formik.values.padecimiento} error={formik.errors.padecimiento}/>
      </FormGroup>
      <FormGroup widths='equal'>
        <Form.Checkbox name="receta" label="receta" onChange={(_,data)=>formik.setFieldValue("receta",data.checked)} checked={formik.values.receta} error={formik.errors.receta}/>
        <Form.Checkbox name="excl" label="Exclusivo" onChange={(_,data)=>formik.setFieldValue("excl",data.checked)} checked={formik.values.excl} error={formik.errors.excl}/>
        <Form.Checkbox name="refri" label="Refrigeración" onChange={(_,data)=>formik.setFieldValue("refri",data.checked)} checked={formik.values.refri} error={formik.errors.refri}/>
      </FormGroup>
      <FormGroup widths='equal'>
        <Form.Checkbox name='existe' label="Existe" onChange={(_,data)=>formik.setFieldValue("existe",data.checked)} checked={formik.values.existe} error={formik.errors.existe}/>
        <Form.Input name="clave_ex" label="Clave" onChange={formik.handleChange} value={formik.values.clave_ex} error={formik.errors.clave_ex}/>
        <Form.Input name="base_ex" label="Base" onChange={formik.handleChange} value={formik.values.base_ex} error={formik.errors.base_ex}/>
      </FormGroup>
      <FormGroup widths='equal'>
        <Dropdown placeholder="TipoF" fluid selection options={TipoF} onChange={(_,data)=>formik.setFieldValue("tipoF",data.value)} value={formik.values.tipoF} error={formik.errors.tipoF}/>
        <Form.Input name="caducidad" label="Caducidad" onChange={formik.handleChange} value={formik.values.caducidad} error={formik.errors.caducidad}/>
      </FormGroup>
      <FormButton type='submit' 
      primary 
      fluid 
      loading={formik.isSubmitting} onClick={formik.onSubmit}>{mag ? "Actualizar Cotizacion": "Cancelar"}
      </FormButton>
      </Form>
  )
}
