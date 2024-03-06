import React from 'react';
import {Form, Container, Input, Checkbox} from "semantic-ui-react";
import {Table, TableRow, TableHeaderCell,TableHeader,TableCell, TableBody} from "semantic-ui-react"
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './OpeForm.form';
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';

const magController = new Mag();

export function OpeForm(props) {
  const {onReload, onClose, mag} = props;
  const dxp = mag._id.substring(24,18);
  const {accessToken} = useAuth();
  const formik = useFormik({
    initialValues: initialValues(mag),
    validationSchema: validationSchema(mag),
    validateOnChange: false,
    onSubmit: async(formValue)=>{
      try {
        if(!mag){
          await magController.createMag(accessToken, formValue)
        }else{
          await magController.updateMag(accessToken, mag._id, formValue)
        }
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className='info-cotizacion' widths='equal'>
        <p>Asesor: {mag.asesor}</p>
        <p>Cliente: {mag.cardcode}</p>
        <p>Activos: {mag.activos}</p>
        <p>Info. Investigación y Desarrollo: {mag.infoDes}</p>
        <p>Presentaciones: {mag.presentacion}</p>
      </Form.Group>
      <Form.Group className='info-cotizacion__ope' widths='equal'>
        <Container>
          <p>Folio Operaciones:</p>
          <Input name='folio_Op' placeholder='Folio Operaciones' onChange={formik.handleChange} value={formik.values.folio_Op} error={formik.errors.folio_Op}/>
          <Table compact celled definition>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Valido</TableHeaderCell>
                <TableHeaderCell>Presentaciones</TableHeaderCell>
                <TableHeaderCell>Precio</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><Checkbox slider/></TableCell>
                <TableCell>7.5 ML</TableCell>
                <TableCell><Form.Input name='precio1' placeholder='7.5 ML' onChange={formik.handleChange} value={formik.values.precio1} error={formik.errors.precio1}/></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Checkbox slider/></TableCell>
                <TableCell>15 ML</TableCell>
                <TableCell><Form.Input name='precio2' placeholder='15 ML' onChange={formik.handleChange} value={formik.values.precio2} error={formik.errors.precio2}/></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Checkbox slider/></TableCell>
                <TableCell>30 ML</TableCell>
                <TableCell><Form.Input name='precio3' placeholder='30 ML' onChange={formik.handleChange} value={formik.values.precio3} error={formik.errors.precio3}/></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Checkbox slider/></TableCell>
                <TableCell>60 ML</TableCell>
                <TableCell><Form.Input name='precio4' placeholder='60 ML' onChange={formik.handleChange} value={formik.values.precio4} error={formik.errors.precio4}/></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Checkbox slider/></TableCell>
                <TableCell>120 ML</TableCell>
                <TableCell><Form.Input name='precio5' placeholder='120 ML' onChange={formik.handleChange} value={formik.values.precio5} error={formik.errors.precio5}/></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Checkbox slider/></TableCell>
                <TableCell>240 ML</TableCell>
                <TableCell><Form.Input name='precio6' placeholder='240 ML' onChange={formik.handleChange} value={formik.values.precio6} error={formik.errors.precio6}/></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Checkbox slider/></TableCell>
                <TableCell>480 ML</TableCell>
                <TableCell><Form.Input name='precio7' placeholder='480 ML' onChange={formik.handleChange} value={formik.values.precio7} error={formik.errors.precio7}/></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Checkbox slider/></TableCell>
                <TableCell>960 ML</TableCell>
                <TableCell><Form.Input name='precio8' placeholder='960 ML' onChange={formik.handleChange} value={formik.values.precio8} error={formik.errors.precio8}/></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </Container>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
          Actualizar info Operaciones
        </Form.Button>
      </Form.Group>
    </Form>    
  )
}
