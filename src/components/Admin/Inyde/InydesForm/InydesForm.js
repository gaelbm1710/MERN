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
            {mag && [1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                const fieldName = `precio${index}`;
                const presentacionValue = mag.presentacion;
                const presentacionRowValue = `${(index +1)* presentacionValue} ML`;
                return presentacionValue === presentacionRowValue && (
                  <TableRow key={index}>
                    <TableCell>{presentacionRowValue}</TableCell>
                    <TableCell><Form.Input name={fieldName} placeholder='0' onChange={formik.handleChange} value={formik.values[fieldName]} error={formik.errors[fieldName]} /></TableCell>
                  </TableRow>
                );
              })}
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
