import React from 'react';
import { Form, TableRow, TableBody, TableHeader, TableHeaderCell, Table, Container, TableCell } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues,validationSchema} from "./ComeForm.form";
import {Mag} from "../../../../api";
import {useAuth} from "../../../../hooks";
import "./ComeForm.scss";


const magController = new Mag();

export function ComeForm(props) {
  const { onClose, onReload, mag} = props;
  const {accessToken} = useAuth();
  const formik = useFormik({
    initialValues: initialValues(mag),
    validationSchema: validationSchema(mag),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data={
          folio_sCom: formValue.folio_sCom,
        }
        if(!mag){
          await magController.createMagCome(accessToken, data);
        }else{
          await magController.updateMagCome(accessToken, mag._id, data);
        };
        onClose();
        onReload();
      }catch (error) {
        console.error(error);
      }
    }

  });

  return (
    <Form className='gc-form' onSubmit={formik.handleSubmit}>
      <Container className='gc-form__info'>
        <p>CardCode: <span>{mag.cardcode}</span></p>
        <p>Asesor: <span>{mag.asesor}</span></p>
        <p>Folio Operaciones: <span>{mag.folio_Op}</span></p>
        <p>Folio Investigación y Desarrollo: <span>{mag.folio_IyD}</span></p>
        <p>Base: <span>{mag.base}</span></p>
        <p>Activos: <span>{mag.activos}</span></p>
        <p>Clasificación: <span>{mag.clasi}</span></p>
        <p>Especialidad: <span>{mag.especialidad}</span></p>
        <p>Muestra: <span>{mag.necesita_muestra}</span></p>
        <p>Receta: <span>{mag.receta}</span></p>
        <p>Refrigerante: <span>{mag.refri}</span></p>
        <p>Tipo Formula: <span>{mag.tipoF}</span></p>
        <p>Comentarios internos: <span>{mag.comInt}</span></p>
        <p>Comentarios Clientes: <span>{mag.comClie}</span></p>
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
      <Form.Input className='folio_op' name="folio_sCom" placeholeder="Folio Gestión Comercial" onChange={formik.handleChange} value={formik.values.folio_sCom} error={formik.errors.folio_sCom}/>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {mag ? "Actualizar Cotización": "Crear Cotización"}
      </Form.Button>
    </Form>
  );
}
