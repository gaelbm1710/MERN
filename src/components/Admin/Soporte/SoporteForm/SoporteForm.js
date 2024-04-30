import React, { useCallback } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './SoporteForm.form';
import { Soporte } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ENV } from '../../../../utils';
import "./SoporteForm.scss";

const servicios = [
    { key: "SoporteTecnico", text: "Soporte Técnico", value: "SoporteTecnico" },
    { key: "SoporteSistemas", text: "Soporte Sistemas", value: "SoporteSistemas" },
    { key: "DMR", text: "Desarrollo o modificaciones de Reportes", value: "DMR" },
    { key: "otro", text: "Otro", value: "otro" }
];

const soporteController = new Soporte();

export function SoporteForm(props) {
    const { onClose, onReload, soporte } = props;
    const { accessToken } = useAuth();
    const { user: { email } } = useAuth();
    const CorreoDueno = email;

    const formik = useFormik({
        initialValues: initialValues(soporte, CorreoDueno),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!soporte) {
                    await soporteController.createTicket(accessToken, formValue);
                } else {
                    await soporteController.updateTicket(accessToken, soporte._id, formValue);
                }
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    });

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("documentos", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation",
        onDrop
    });

    const getDocumento = () => {
        if (formik.values.documentos) {
            return formik.values.documentos;
        } else if (formik.values.documentos) {
            return `${ENV.BASE_PATH}/${formik.values.documentos}`;
        }
        return null;
    };

    return (
        <Form className='ticket-form' onSubmit={formik.handleSubmit}>
            <Form.Dropdown label="Elige un tipo de Servicio" placeholder="Servicios" fluid selection multiple options={servicios} onChange={(_, data) => formik.setFieldValue("servicio", data.value)} value={formik.values.servicio || []} error={formik.errors.servicio} />
            
            {/* Campo de entrada */}
            <Form.Input />

            {/* Botón para subir documentos */}
            <div className='ticket-form__documento' {...getRootProps()}>
                <input {...getInputProps()} />
                <Button type="button"
                    className="button-upload"
                    style={{ margin: "10px 0" }}>
                    {formik.values.file ? `Archivo cargado: ${formik.values.file.name}` : "Agregar Documento"}
                </Button>
            </div>

            {/* Área de previsualización */}
            <div className="preview-area">
                {formik.values.documentos ? (
                    <div className="preview-text">
                        {formik.values.documentos.endsWith(".pdf") ? (
                            <iframe src={formik.values.documentos} title=" Vista previa del documento" width="100%" height="500px"></iframe>
                        ) : (
                            <img src={formik.values.documentos} alt="    Vista previa del documento" style={{ maxWidth: '100%', height: 'auto' }} />
                        )
                        }
                    </div>
                ) : null}
            </div>

            {/* Botón de envío del formulario */}
            <br></br><Button type="submit">Enviar</Button>
        </Form>
    );
}