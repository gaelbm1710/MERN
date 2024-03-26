import React from 'react';
import {Form, Dropdown, Container, FormInput} from 'semantic-ui-react';
import { useFormik } from 'formik';
import {initialValues, validationSchema} from './InydeForm.form';
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import "./InydeForm.scss"


const clasi = [
  {key:"FM", text:"FM", value:"FM"},
  {key:"DC", text:"DC", value:"DC"}
];

const tipoF = [
  {key:"Cerrada", text:"Cerrada", value:"cd"},
  {key:"Atributos", text:"Atributos", value:"at"}
];

const magController = new Mag();

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
          infoDesa: formValue.infoDesa,
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
    <Form className='inyde-form' onSubmit={formik.handleSubmit}>
      <Form.Group widths='equal'>
        <Container className='inyde-form__info'>
        <p>Asesor: <span>{mag.asesor}</span></p>
        <p>Cliente: <span>{mag.cardcode}</span></p>
        <p>Base: <span>{mag.base}</span></p>
        <p>Activos: <span>{mag.activos}</span></p>
        <p>Especialidad: <span>{mag.especialidad}</span></p>
        <p>Padecimiento: <span>{mag.padecimiento}</span></p>
        </Container>
      </Form.Group>
      <Form.Group widths='equal'>
        <Container>
          <Form.Input label='Folio' name='folio_IyD' onChange={formik.handleChange} value={formik.values.folio_IyD} error={formik.errors.folio_IyD}/>
          <Form.Dropdown label='Clasificacion' placeholder='' options={clasi} selection onChange={(_,data) => formik.setFieldValue("clasi", data.value)} value={formik.values.clasi} error={formik.errors.clasi}/>
          <Form.Dropdown label='Tipo de Formula' placeholder='' options={tipoF} selection onChange={(_,data) => formik.setFieldValue("tipoF", data.value)} value={formik.values.tipoF} error={formik.errors.tipoF}/>
          <Form.Input label='Caducidad' name='caducidad' onChange={formik.handleChange} value={formik.values.caducidad} error={formik.errors.caducidad}/>
          <br></br><Form.Checkbox label='Necesita Receta'
          name='receta' onChange={(_, data) => formik.setFieldValue("receta", data.checked)} checked={formik.values.receta} error={formik.errors.receta}/>
        </Container>
      </Form.Group>
      <Form.Group widths='equal'>
        <Container>
          <Form.TextArea label='Información' name='infoDesa' onChange={formik.handleChange} value={formik.values.infoDesa} error={formik.errors.infoDesa}/>
          <Form.TextArea label='Comentarios Internos' name='comInt' onChange={formik.handleChange} value={formik.values.comInt} error={formik.errors.comInt}/>
          <Form.TextArea label='Comentarios Clientes' name='comClie' onChange={formik.handleChange} value={formik.values.comClie} error={formik.errors.comClie}/>
          <br></br><Form.Checkbox label='Muestra'
          name='excl' onChange={(_, data) => formik.setFieldValue("necesita_muestra", data.checked)} checked={formik.values.necesita_muestra} error={formik.errors.necesita_muestra}/>
          <br></br><Form.Checkbox label='Exclusiva'
          name='excl' onChange={(_, data) => formik.setFieldValue("excl", data.checked)} checked={formik.values.excl} error={formik.errors.excl}/>
          <br></br><Form.Checkbox label='Refrigeración'
          name='refri' onChange={(_, data) => formik.setFieldValue("refri", data.checked)} checked={formik.values.refri} error={formik.errors.refri}/>
        </Container>
      </Form.Group>
      <Form.Group widths='equal'>
        <Container>
          <Form.Checkbox label='Existe'
          name='existe' onChange={(_, data) => formik.setFieldValue("existe", data.checked)} checked={formik.values.existe} error={formik.errors.existe}/>
          <br></br><Form.Input label='Clave' name='clave_ex' onChange={formik.handleChange} value={formik.values.clave_ex} error={formik.errors.clave_ex}/>
          <Form.Input label='Base' name='base_ex' onChange={formik.handleChange} value={formik.values.base_ex} error={formik.errors.base_ex}/>
        </Container>
      </Form.Group>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {mag ?"Actualizar Cotizacion": "Cancelar"}
      </Form.Button>
      </Form>
  )
}
