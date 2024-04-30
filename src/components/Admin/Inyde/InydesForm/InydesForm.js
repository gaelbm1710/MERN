import React from 'react'
import { Form, Container, TableRow, TableBody, TableHeader, TableHeaderCell, Table, TableCell } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { Mag } from '../../../../api'
import { useAuth } from '../../../../hooks'
import { initialValuess, validationSchemas } from './InydesForm.form';

const magController = new Mag();

export function InydesForm(props) {
  const { onClose, onReload, mag } = props;
  // const dxp = mag._id.substring(24,18);
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValuess(mag),
    validationSchema: validationSchemas(mag),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          folio_IyD: formValue.folio_IyD,
          cardcode: formValue.cardcode,
          clave_ex: formValue.clave_ex,
          comInt: formValue.comInt,
          presentacion: formValue.presentacion,
          comClie: formValue.comClie,
          asesor: formValue.asesor,
          precio1: formValue.precio1,
          precio2: formValue.precio2,
          precio3: formValue.precio3,
          precio4: formValue.precio4,
          precio5: formValue.precio5,
          precio6: formValue.precio6,
          precio7: formValue.precio7,
          precio8: formValue.precio8,
        }
        if (!mag) {
          await magController.createMag(accessToken, data);
        } else {
          await magController.updateMagi(accessToken, mag._id, data);
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
          <p>Clave Existente: <span>{mag.clave_ex}</span></p>
          <p>Presentación: <span>{mag.presentacion}</span></p>
          <Form.Input label='Folio' name='folio_IyD' onChange={formik.handleChange} value={formik.values.folio_IyD} error={formik.errors.folio_IyD}/>
        </Container>
      </Form.Group>
      <Form.Group>
        <Container>
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
      </Form.Group>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {mag ? "Actualizar Cotizacion" : "Cancelar"}
      </Form.Button>
    </Form>
  )
}
