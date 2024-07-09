import React from 'react';
import { Form, Container } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './InydeForm.form';
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import "./InydeForm.scss"


const clasi = [
  { key: "FM", text: "FM", value: "FM" },
  { key: "DC", text: "DC", value: "DC" }
];

const tipoF = [
  { key: "Cerrada", text: "Cerrada", value: "cd" },
  { key: "Atributos", text: "Atributos", value: "at" }
];

const bases = [
  { key: "Aceite", text: "Aceite", value: "Aceite" },
  { key: "Cloroformo", text: "Cloroformo", value: "Cloroformo" },
  { key: "Colodion", text: "Colodion", value: "Colodion" },
  { key: "Crema", text: "Crema", value: "Crema" },
  { key: "CremaLiquida", text: "Crema Liquida", value: "CremaLiquida" },
  { key: "Gel", text: "Gel", value: "Gel" },
  { key: "GelCrema", text: "Gel-Crema", value: "GelCrema" },
  { key: "HidraSilk", text: "HidraSilk", value: "HidraSilk" },
  { key: "Hidroalcoholica", text: "Hidroalcoholica", value: "Hidroalcoholica" },
  { key: "Jabon", text: "Jabon", value: "Jabon" },
  { key: "Locion", text: "Locion", value: "Locion" },
  { key: "LocionAcuosa", text: "Locion Acuosa", value: "LocionAcuosa" },
  { key: "LocionCapilar", text: "Locion Capilar", value: "LocionCapilar" },
  { key: "LocionCrema", text: "Locion Crema", value: "LocionCrema" },
  { key: "NutraSilk", text: "Nutra Silk", value: "NutraSilk" },
  { key: "NutraSilkCream", text: "Nutra Silk Cream", value: "NutraSilkCream" },
  { key: "OMIFGEL", text: "OMI F GEL", value: "OMIFGEL" },
  { key: "Pasta", text: "Pasta", value: "Pasta" },
  { key: "Rollon", text: "Roll on", value: "Rollon" },
  { key: "Shampoo", text: "Shampoo", value: "Shampoo" },
  { key: "SilkDryGel", text: "Silk Dry Gel", value: "SilkDryGel" },
  { key: "SilkSerum", text: "Silk Serum", value: "SilkSerum" },
  { key: "Suero", text: "Suero", value: "Suero" },
  { key: "Talco", text: "Talco", value: "Talco" },
  { key: "Unguento", text: "Unguento", value: "Unguento" },
  { key: "Vaselina", text: "Vaselina", value: "Vaselina" },
];

const magController = new Mag();

export function InydeForm(props) {
  const { onClose, onReload, mag } = props;
  // const dxp = mag._id.substring(24,18);
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(mag),
    validationSchema: validationSchema(mag),
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
        }
        if (!mag) {
          await magController.createMag(accessToken, data);
        } else {
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
          <p>Especialidad: <span>{mag.especialidad}</span></p>
          <p>Padecimiento: <span>{mag.padecimiento}</span></p>
          <p>Comentarios Asesor: <span>{mag.comeAsesor}</span></p>
        </Container>
      </Form.Group>
      <Form.Group widths='equal'>
        <Container className='inyde-form__label'>
          <Form.Input label='Activos' name='activos' onChange={formik.handleChange} value={formik.values.activos} error={formik.errors.activos} />
          <Form.Dropdown label="Base" placeholder="Base" options={bases} selection onChange={(_, data) => formik.setFieldValue("base", data.value)} value={formik.values.base} error={formik.errors.base} />
          <Form.Input label='Folio' name='folio_IyD' onChange={formik.handleChange} value={formik.values.folio_IyD} error={formik.errors.folio_IyD} />
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
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting} className='custom-button'>
        {mag ? "Guardar Cotizacion" : "Cancelar"}
      </Form.Button>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting} className='custom-button'>
        {mag ? "Actualizar Cotizacion" : "Cancelar"}
      </Form.Button>
    </Form>
  )
}
