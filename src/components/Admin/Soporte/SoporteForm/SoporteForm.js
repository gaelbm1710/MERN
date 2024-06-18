import React, { useCallback } from 'react';
import { Form, Button, Label, Icon, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './SoporteForm.form';
import { Soporte } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ENV } from '../../../../utils';
import "./SoporteForm.scss";

const servicios = [
    { key: "SoporteTecnico", text: "Soporte Técnico (0 - 3 días)", value: "SoporteTecnico" },
    { key: "SoporteSistemas", text: "Soporte Sistemas (0 - 3 días)", value: "SoporteSistemas" },
    { key: "DMR", text: "Desarrollo o modificaciones de Reportes (0 - 6 días)", value: "DMR" },
    { key: "AC", text: "Asesorías y/o capacitaciones", value: "AC" },
    { key: "otro", text: "Otro", value: "otro" }
];

const soporteController = new Soporte();

export function SoporteForm(props) {
    const { onClose, onReload, soporte } = props
    const { accessToken } = useAuth();
    const { user: { email } } = useAuth();
    const CorreoDueno = email;

    const formik = useFormik({
        initialValues: initialValues(soporte, CorreoDueno),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    servicio: formValue.servicio,
                    descripcion: formValue.descripcion,
                    dueno: CorreoDueno,
                    documentos: formValue.documentos
                };
                if (!soporte) {
                    await soporteController.createATicket(accessToken, data)
                } else {
                    console.log("Esto no debería de pasar");
                }
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    });
/*
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("documentos", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });
*/
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        formik.setFieldValue("documentos", fileUrl);
        formik.setFieldValue("documentos", file);
        // eslint-disable-next-line
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation",
        onDrop
    });

    const getDocumento = () => {
        if (formik.values.documentos) {
            return formik.values.documentos;
        } else if (formik.values.documentos) {
            return `${ENV.TICKETSOPORTE}/${formik.values.documentos}`;
        }
        return null;
    };

    return (
        <Form className='ticket-form' onSubmit={formik.handleSubmit}>
            <Form.Dropdown label='Selecciona un Servicio' placeholder='Selecciona un Servicio' options={servicios} selection onChange={(_, data) => formik.setFieldValue("servicio", data.value)} value={formik.values.servicio} error={formik.errors.servicio} />
            <Form.TextArea name="descripcion"  label='Ingrese la solicitud o incidencia' placeholder='Describa su solicitud o incidencia' onChange={formik.handleChange} value={formik.values.descripcion} error={formik.errors.descripcion} />
            <div className='ticket-form__documento'{...getRootProps()}>
                <input {...getInputProps()} name='documentos'/>
                <Label>
                    Agregar Documentos y/o Imagenes <input src={getDocumento()} type='file' name='documentos'/>
                </Label>
            </div>
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {soporte ? "Revisar Ticket" : "Crear Ticket"}
            </Form.Button>
        </Form>
    )
}