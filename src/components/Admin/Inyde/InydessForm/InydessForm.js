import React from 'react'
import { Form, Container } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { Mag } from '../../../../api'
import { useAuth } from '../../../../hooks'
import { initialValuesss, validationSchemass } from './InydessForm.form';

const magController = new Mag();

const clasi = [
  { key: "FM", text: "FM", value: "FM" },
  { key: "DC", text: "DC", value: "DC" }
];

const tipoF = [
  { key: "Cerrada", text: "Cerrada", value: "cd" },
  { key: "Atributos", text: "Atributos", value: "at" }
];

export function InydessForm(props) {
  const { onClose, onReload, mag } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValuesss(mag),
    validationSchema: validationSchemass(mag),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          folio: mag ? mag.folio : 0,
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
          comeAsesor: formValue.comeAsesor
        }
        if (!mag) {
          await magController.createMag(accessToken, data);
        } else {
          await magController.updateMagis(accessToken, mag._id, data);
        }
        onClose();
        onReload();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleSave = async () => {
    try {
      const data = {
        folio: mag ? mag.folio : 0,
        folio_IyD: formik.values.folio_IyD,
        cardcode: formik.values.cardcode,
        base: formik.values.base,
        activos: formik.values.activos,
        especialidad: formik.values.especialidad,
        padecimiento: formik.values.padecimiento,
        necesita_muestra: formik.values.necesita_muestra,
        existe: formik.values.existe,
        base_ex: formik.values.base_ex,
        clave_ex: formik.values.clave_ex,
        clasi: formik.values.clasi,
        receta: formik.values.receta,
        refri: formik.values.refri,
        infoDesa: formik.values.infoDesa,
        tipoF: formik.values.tipoF,
        caducidad: formik.values.caducidad,
        comInt: formik.values.comInt,
        excl: formik.values.excl,
        presentacion: formik.values.presentacion,
        comClie: formik.values.comClie,
        asesor: formik.values.asesor,
        comeAsesor: formik.values.comeAsesor
      }
      await magController.saveMagis(accessToken, mag._id, data)
      onClose();
      onReload();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form className='inyde-form' onSubmit={formik.handleSubmit}>
      <Form.Group widths='equal'>
        <Container className='inyde-form__info'>
          <p>Asesor: <span>{mag.asesor}</span></p>
          <p>Cliente: <span>{mag.cardcode}</span></p>
          <p>Base Existente: <span>{mag.base_ex}</span></p>
          <p>Clave Existente: <span>{mag.clave_ex}</span></p>
          <p>Cambio de Base: <span>{mag.base}</span></p>
          <p>Presentación: <span>{mag.presentacion}</span></p>
          <p>Comentarios Asesor: <span>{mag.comeAsesor}</span></p>
        </Container>
      </Form.Group>
      <Form.Group widths='equal'>
        <Container className='inyde-form__label'>
          <Form.Input label='Folio' name='folio_IyD' onChange={formik.handleChange} value={formik.values.folio_IyD} error={formik.errors.folio_IyD} />
          <Form.TextArea label='Activos' name='activos' onChange={formik.handleChange} value={formik.values.activos} error={formik.errors.activos} />
          <Form.Dropdown label='Clasificacion' placeholder='' options={clasi} selection onChange={(_, data) => formik.setFieldValue("clasi", data.value)} value={formik.values.clasi} error={formik.errors.clasi} />
          <Form.Dropdown label='Tipo de Formula' placeholder='' options={tipoF} selection onChange={(_, data) => formik.setFieldValue("tipoF", data.value)} value={formik.values.tipoF} error={formik.errors.tipoF} />
          <Form.Input label='Caducidad (meses)' name='caducidad' onChange={formik.handleChange} value={formik.values.caducidad} error={formik.errors.caducidad} />
          <br></br><Form.Checkbox label='Necesita Receta'
            name='receta' onChange={(_, data) => formik.setFieldValue("receta", data.checked)} checked={formik.values.receta} error={formik.errors.receta} className='custom-checkbox' />
        </Container>
      </Form.Group>
      <Form.Group widths='equal'>
        <Container className='inyde-form__label'>
          <Form.TextArea label='Información' name='infoDesa' onChange={formik.handleChange} value={formik.values.infoDesa} error={formik.errors.infoDesa} />
          <Form.TextArea label='Comentarios Internos' name='comInt' onChange={formik.handleChange} value={formik.values.comInt} error={formik.errors.comInt} />
          <Form.TextArea label='Comentarios Clientes' name='comClie' onChange={formik.handleChange} value={formik.values.comClie} error={formik.errors.comClie} />
          <br></br><Form.Checkbox label='Muestra'
            name='excl' onChange={(_, data) => formik.setFieldValue("necesita_muestra", data.checked)} checked={formik.values.necesita_muestra} error={formik.errors.necesita_muestra} className='custom-checkbox' />
          <br></br><Form.Checkbox label='Exclusiva'
            name='excl' onChange={(_, data) => formik.setFieldValue("excl", data.checked)} checked={formik.values.excl} error={formik.errors.excl} className='custom-checkbox' />
          <br></br><Form.Checkbox label='Refrigeración'
            name='refri' onChange={(_, data) => formik.setFieldValue("refri", data.checked)} checked={formik.values.refri} error={formik.errors.refri} className='custom-checkbox' />
        </Container>
      </Form.Group>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting} onClick={handleSave} >
        {mag ? 'Guardar Cotización' : 'Cancelar'}
      </Form.Button>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {mag ? "Enviar Cotizacion" : "Cancelar"}
      </Form.Button>
    </Form>
  )
}
