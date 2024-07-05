import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValuess, validationSchemas } from './SoporteAsignar.form';
import { Soporte, User } from '../../../../api';
import { useAuth } from '../../../../hooks';

const userController = new User();
const soporteController = new Soporte();

export function SoporteAsignar(props) {
  const { close, onReload, soporte } = props;
  const { accessToken, user: { email, firstname, lastname, role } } = useAuth();
  const nombrecompleto = `${firstname} ${lastname}`;
  const [users, setUsers] = useState([]);

  const formik = useFormik({
    initialValues: initialValuess(soporte),
    validationSchema: validationSchemas(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const macacoSelecionado = formValue.asignado;
        const macacoTexto = macacoSelecionado.join(', ');
        const data = {
          asignado: macacoTexto,
          documentos: soporte ? soporte.documentos : '',
          servicio: soporte ? soporte.servicio : 'Soporte Técnico',
          dueno: soporte ? soporte.dueno : 'REvisar con Sistemas',
          estado: soporte ? soporte.estado : 'Pendiente',
          comentarios: soporte ? soporte.comentarios : '',
          MotivoCancel: soporte ? soporte.MotivoCancel : ''
        };
        if (!soporte) {
          console.log("Hablale al de Sistemas");
        } else {
          await soporteController.asingTicket(accessToken, formValue);
        }
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const sistemas = await userController.getUserSistemas(accessToken);
        setUsers(sistemas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [accessToken]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Dropdown
        label="Asignar a..." fluid selection multiple options={users} onChange={(_, data) => formik.setFieldValue("asignado", data.value)} value={formik.values.asignado || []} error={formik.errors.asignado} />
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        Asignar Ticket
      </Form.Button>
    </Form>
  );
}
