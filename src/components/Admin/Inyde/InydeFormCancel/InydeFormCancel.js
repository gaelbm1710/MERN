import React from 'react'
import { Form, Container } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValuesCancel, validationSchemaCancel } from "./InydeFormCancel.form"
import { Mag } from '../../../../api'
import { useAuth } from '../../../../hooks'

const magController = new Mag();

export function InydeFormCancel(props) {
    const { onClose, onReload, mag } = props;
    const { accessToken } = useAuth();
    const formik = useFormik({
        initialValues: initialValuesCancel(mag),
        validationSchema: validationSchemaCancel(mag),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    folio: mag ? mag.folio : 0,
                    asesor: formValue.asesor,
                    MotivoCancel: formValue.MotivoCancel
                }
                if (!mag) {
                    console.log("Esto no debe de pasar");
                } else {
                    await magController.cancelarMag(accessToken, mag._id, data);
                }
                onClose();
                onReload();
            } catch (error) {
                console.error(error)
            }
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Container>
                    <h1>Ingresa el motivo de la cancelación:</h1>
                    <Form.TextArea name='MotivoCancel' onChange={formik.handleChange} value={formik.values.MotivoCancel} error={formik.errors.MotivoCancel} />
                </Container>
            </Form.Group>
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting} className='custonm-button'>
                Confirmar
            </Form.Button>
        </Form>
    )
}
