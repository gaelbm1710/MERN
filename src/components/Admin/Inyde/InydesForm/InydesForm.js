import React from 'react';
import { Form, Container, TableRow, TableBody, TableHeader, TableHeaderCell, Table, TableCell } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { initialValuess, validationSchemas } from './InydesForm.form';

const magController = new Mag();

export function InydesForm(props) {
  const { onClose, onReload, mag } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValuess(mag),
    validationSchema: validationSchemas(mag),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          folio: mag ? mag.folio : 0,
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
        };
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
    },
  });

  const presentaciones = [
    { label: '7.5 ML', name: 'precio1' },
    { label: '15 ML', name: 'precio2' },
    { label: '30 ML', name: 'precio3' },
    { label: '60 ML', name: 'precio4' },
    { label: '120 ML', name: 'precio5' },
    { label: '240 ML', name: 'precio6' },
    { label: '480 ML', name: 'precio7' },
    { label: '960 ML', name: 'precio8' },
  ];

  // Verificar si mag.presentacion es un array o un string
  const presentacionesDisponibles = mag.presentacion 
    ? Array.isArray(mag.presentacion)
      ? mag.presentacion
      : mag.presentacion.split(',').map(p => p.trim())
    : [];

  const filteredPresentaciones = presentaciones.filter(p => presentacionesDisponibles.includes(p.label));

  return (
    <Form className='inyde-form' onSubmit={formik.handleSubmit}>
      <Form.Group widths='equal'>
        <Container className='inyde-form__info'>
          <p>Asesor: <span>{mag.asesor}</span></p>
          <p>Cliente: <span>{mag.cardcode}</span></p>
          <p>Clave Existente: <span>{mag.clave_ex}</span></p>
          <p>Presentación: <span>{presentacionesDisponibles.join(', ')}</span></p>
          <Form.Input 
            label='Folio' 
            name='folio_IyD' 
            onChange={formik.handleChange} 
            value={formik.values.folio_IyD} 
            error={formik.errors.folio_IyD ? { content: formik.errors.folio_IyD } : null} 
          />
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
              {filteredPresentaciones.map((p, index) => (
                <TableRow key={index}>
                  <TableCell>{p.label}</TableCell>
                  <TableCell>
                    <Form.Input
                      name={p.name}
                      placeholder='0'
                      onChange={formik.handleChange}
                      value={formik.values[p.name]}
                      error={formik.errors[p.name] ? { content: formik.errors[p.name] } : null}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </Form.Group>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {mag ? "Actualizar Cotización" : "Cancelar"}
      </Form.Button>
    </Form>
  );
}
