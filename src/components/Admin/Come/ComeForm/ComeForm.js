import React from 'react';
import { Form, TableRow, TableBody, TableHeader, TableHeaderCell, Table, Container, TableCell } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ComeForm.form";
import { Mag } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./ComeForm.scss";


const magController = new Mag();

export function ComeForm(props) {
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
          folio_sCom: formValue.folio_sCom,
          asesor: mag ? mag.asesor : 'soporte.sistemas@o-lab.mx',

        }
        if (!mag) {
          await magController.createMagCome(accessToken, data);
        } else {
          await magController.updateMagCome(accessToken, mag._id, data);
        };
        onClose();
        onReload();
      } catch (error) {
        console.error(error);
      }
    }

  });

  let formview;
  if (mag.actividad === 'nueva') {
    formview = <>
      <p>CardCode: <span>{mag.cardcode}</span></p>
      <p>Cliente: <span>{mag.cliente}</span></p>
      <p>Asesor: <span>{mag.asesor}</span></p>
      <p>Base: <span>{mag.base}</span></p>
      <p>Activos: <span>{mag.activos}</span></p>
      <p>Clasificación: <span>{mag.clasi}</span></p>
      <p>Especialidad: <span>{mag.especialidad}</span></p>
      <p>Muestra: <span>{mag.necesita_muestra ? 'Si' : 'No'}</span></p>
      <p>Refrigeración: <span>{mag.refri ? 'Si' : 'No'}</span></p>
      <p>Padecimiento: <span>{mag.padecimiento}</span></p>
      <p>Caducidad: <span>{mag.caducidad}</span></p>
    </>
  } else if (mag.actividad === 'presentacion') {
    formview = <>
      <p>CardCode: <span>{mag.cardcode}</span></p>
      <p>Asesor: <span>{mag.asesor}</span></p>
      <p>Clave: <span>{mag.clave_ex}</span></p>
    </>
  } else if (mag.actividad === 'cambio') {
    formview = <>
      <p>CardCode: <span>{mag.cardcode}</span></p>
      <p>Cliente: <span>{mag.cliente}</span></p>
      <p>Asesor: <span>{mag.asesor}</span></p>
      <p>Clave Existente: <span>{mag.clave_ex}</span></p>
      <p>Base: <span>{mag.base}</span></p>
      <p>Cambio a Base: <span>{mag.base_ex}</span></p>
      <p>Activos: <span>{mag.activos}</span></p>
      <p>Clasificación: <span>{mag.clasi}</span></p>
      <p>Especialidad: <span>{mag.especialidad}</span></p>
      <p>Muestra: <span>{mag.necesita_muestra ? 'Si' : 'No'}</span></p>
    </>
  } else {
    formview = <div>Error en sistema</div>
  }

  return (
    <Form className='gc-form' onSubmit={formik.handleSubmit}>
      <Container className='gc-form__info'>
        {formview}
      </Container>
      <Container widths='equal'>
        <Table className='table-precio'>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Presentaciones</TableHeaderCell>
              <TableHeaderCell>Precios</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>7.5 ML</TableCell>
              <TableCell>{mag.precio1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>15 ML</TableCell>
              <TableCell>{mag.precio2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>30 ML</TableCell>
              <TableCell>{mag.precio3}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>60 ML</TableCell>
              <TableCell>{mag.precio4}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>120 ML</TableCell>
              <TableCell>{mag.precio5}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>240 ML</TableCell>
              <TableCell>{mag.precio6}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>480 ML</TableCell>
              <TableCell>{mag.precio7}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>960 ML</TableCell>
              <TableCell>{mag.precio8}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
      <span>Folio Gestión Comercial:</span>
      <Form.Input className='folio_op' name="folio_sCom" placeholeder="0" onChange={formik.handleChange} value={formik.values.folio_sCom} error={formik.errors.folio_sCom} />
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {mag ? "Actualizar Cotización" : "Crear Cotización"}
      </Form.Button>
    </Form>
  );
}
