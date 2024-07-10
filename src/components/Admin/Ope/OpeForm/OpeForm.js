import React from 'react';
import { Form, TableRow, TableBody, TableHeader, TableHeaderCell, Table, Container, TableCell } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./OpeForm.form";
import { Mag } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./OpeForm.scss";


const magController = new Mag();

export function OpeForm(props) {
  const { onClose, onReload, mag } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(mag),
    validationSchema: validationSchema(mag),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          folio: mag ? mag.folio : 0,
          asesor: mag ? mag.asesor : 'soporte.sistemas@o-lab.mx',
          cardcode: mag ? mag.cardcode : 'Null',
          activos: mag ? mag.activos : 'Null',
          base: mag ? mag.base : 'Null',
          refri: mag ? mag.refri : false,
          caducidad: mag ? mag.caducidad : 6,
          excl: mag ? mag.excl : false,
          clasi: mag ? mag.clasi : 'Null',
          comClie: mag ? mag.comClie : 'Revisar con Investigación y Desarrollo',
          infoDesa: mag ? mag.infoDesa : 'Revisar con Investigación y Desarrollo',
          receta: mag ? mag.receta : 'Si',
          folio_Op: formValue.folio_Op,
          precio1: formValue.precio1,
          precio2: formValue.precio2,
          precio3: formValue.precio3,
          precio4: formValue.precio4,
          precio5: formValue.precio5,
          precio6: formValue.precio6,
          precio7: formValue.precio7,
          precio8: formValue.precio8,
          envases: mag ? mag.envases : 'Revisar con Investigación y Desarrollo'
        }
        if (!mag) {
          await magController.createMagOpe(accessToken, data);
        } else {
          await magController.updateMagOpe(accessToken, mag._id, data);
        };
        onClose();
        onReload();
      } catch (error) {
        console.error(error);
      }
    }

  });

  return (
    <Form className='ope-form' onSubmit={formik.handleSubmit}>
      <Container className='ope-form__info'>
        <p>Asesor: <span>{mag.asesor}</span></p>
        <p>Cliente: <span>{mag.cardcode}</span></p>
        <p>Activos: <span>{mag.activos}</span></p>
        <p>Info. Investigación y Desarrollo: <span>{mag.infoDesa}</span></p>
        <p>Presentaciones: <span>{mag.presentacion}</span></p>
        <p>Comentarios Internos: <span>{mag.comInt}</span></p>
      </Container>
      <Container widths='equal' className='ope-form__label'>
        <span>Folio Operaciones:</span>
        <Form.Input className='folio_op' name="folio_Op" placeholeder="Folio Operaciones" onChange={formik.handleChange} value={formik.values.folio_Op} error={formik.errors.folio_Op} />
        <Table className='table-precio' celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Presentaciones</TableHeaderCell>
              <TableHeaderCell>Precio</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>7.5 ML</TableCell>
              <TableCell><Form.Input name='precio1' placeholder='0' onChange={formik.handleChange} value={formik.values.precio1} error={formik.errors.precio1} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>15 ML</TableCell>
              <TableCell><Form.Input name='precio2' placeholder='0' onChange={formik.handleChange} value={formik.values.precio2} error={formik.errors.precio2} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>30 ML</TableCell>
              <TableCell><Form.Input name='precio3' placeholder='0' onChange={formik.handleChange} value={formik.values.precio3} error={formik.errors.precio3} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>60 ML</TableCell>
              <TableCell><Form.Input name='precio4' placeholder='0' onChange={formik.handleChange} value={formik.values.precio4} error={formik.errors.precio4} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>120 ML</TableCell>
              <TableCell><Form.Input name='precio5' placeholder='0' onChange={formik.handleChange} value={formik.values.precio5} error={formik.errors.precio5} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>240 ML</TableCell>
              <TableCell><Form.Input name='precio6' placeholder='0' onChange={formik.handleChange} value={formik.values.precio6} error={formik.errors.precio6} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>480 ML</TableCell>
              <TableCell><Form.Input name='precio7' placeholder='0' onChange={formik.handleChange} value={formik.values.precio7} error={formik.errors.precio7} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>960 ML</TableCell>
              <TableCell><Form.Input name='precio8' placeholder='0' onChange={formik.handleChange} value={formik.values.precio8} error={formik.errors.precio8} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {mag ? "Actualizar Cotización" : "Crear Cotización"}
      </Form.Button>
    </Form>
  );
}
