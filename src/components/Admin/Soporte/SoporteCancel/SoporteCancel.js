import React from 'react'
import { Container, Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValuesCancel, validationSchemaCancel } from './SoporteCancel.form'
import { Soporte } from '../../../../api'
import { useAuth } from '../../../../hooks'

const soporteController = new Soporte();

export function SoporteCancel(props) {
    const { onReload, close, soporte } = props;
    const { accessToken } = useAuth();
    const { user: { email } } = useAuth();
    const Cancelpor = email;
    const formik = useFormik({
        initialValues: initialValuesCancel(soporte, Cancelpor),
        validationSchema: validationSchemaCancel(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    folio: soporte ? soporte.folio : 0,
                    Cancelby: Cancelpor,
                    MotivoCancel: formValue.MotivoCancel
                }
                if (!soporte) {
                    console.log('Marcale a Sistemas :D');
                } else {
                    await soporteController.cancelTikcet(accessToken, soporte._id, data);
                }
                close();
                onReload();
            } catch (error) {
                console.error(error);
            }
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Container>
                    <h1>Ingresa el motivo de la Cancelación</h1>
                    <Form.TextArea name='MotivoCancel' placeholder='Ingresa el Motivo de la Cancelación' onChange={formik.handleChange} value={formik.values.MotivoCancel} error={formik.errors.MotivoCancel} />
                </Container>
            </Form.Group>
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting} >
                Confirmar
            </Form.Button>
        </Form>
    )
}
