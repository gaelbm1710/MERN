import React from 'react'
import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValuess, validationSchemas } from './SoporteAsignar.form'
import { Soporte, User } from '../../../../api'
import { useAuth } from '../../../../hooks'

const userController = new User();
const soporteController = new Soporte();


export function SoporteAsignar(props) {
  const { close, onReload, soporte } = props;
  const { accessToken, user: { email, firstname, lastname, role } } = useAuth();
  const nombrecompleto = `${firstname} ${lastname}`
  const formik = useFormik({
    initialValues: initialValuess(soporte),
    validationSchema: validationSchemas(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const macacoSelecionado = formValue.asignado;
        const macacoTexto = macacoSelecionado.join(', ');
        const data = {
          asignado: macacoTexto
        };
        if (!soporte) {
          await soporteController.updateTicket(accessToken, formValue);
        } else {
          console.log("Hablale al de Sistemas");
        }
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    }
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Dropdown label="Asignar..." placeholder="Asignar a ...." fluid selection multiple onChange={(_, data) => formik.setFieldValue("asignado", data.value)} value={formik.values.asignado || []} error={formik.errors.asignado} />
    </Form>
  )
}
