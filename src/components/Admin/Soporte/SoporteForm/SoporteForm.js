import React, { useCallback, useState } from 'react';
import { Form, Icon, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './SoporteForm.form';
import { useDropzone } from 'react-dropzone';
import { Soporte } from '../../../../api';
import { useAuth } from '../../../../hooks';
//import { ENV } from '../../../../utils';
import './SoporteForm.scss';
const soporteController = new Soporte();

const servicios = [
    { key: "SoporteTecnico", text: "Soporte Técnico (0 - 3 días)", value: "SoporteTecnico" },
    { key: "SoporteSistemas", text: "Soporte Sistemas (0 - 3 días)", value: "SoporteSistemas" },
    { key: "DMR", text: "Desarrollo o modificaciones de Reportes (0 - 6 días)", value: "DMR" },
    { key: "AC", text: "Asesorías y/o capacitaciones", value: "AC" },
    { key: "otro", text: "Otro", value: "otro" }
];

export function SoporteForm(props) {
    const { close, onReload, soporte } = props
    const { accessToken, user: { email } } = useAuth();
    const [myFiles, setMyFiles] = useState([]);
    const correoDueno = email;
    const formik = useFormik({
        initialValues: initialValues(soporte, correoDueno),
        validationSchema: validationSchema(soporte),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!soporte) {
                    await soporteController.createATicket(accessToken, formValue);
                } else {
                    console.log('Actualizar Ticket, no debería de pasar');
                }
                onReload();
                close();
            } catch (error) {
                console.error(error);
            }
        }
    });

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        formik.setFieldValue("documentos", fileUrl);
        formik.setFieldValue("fileDocumentos", file);
        // eslint-disable-next-line
        setMyFiles([...myFiles, ...acceptedFiles])
    }, [myFiles]);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: {
            'image/png': ['.jpeg', '.png', '.jpg'],
            'video/mp3': ['.mp3', '.mp4'],
            'text/csv': ['.csv'],
            'application/pdf': ['.doc', '.docx', '.pdf', '.xls', '.xlsx']
        },
        onDrop,
    });


    /*const handleRemoveFile = () => {
        formik.setFieldValue("documentos", null);
    };*/

    const removeFile = file => () => {
        const newFiles = [...myFiles]
        newFiles.splice(newFiles.indexOf(file), 1)
        setMyFiles(newFiles)
    }




    /* const getDocumentos = () => {
         if (formik.values.fileDocumentos) {
             return formik.values.documentos;
         } else if (formik.values.documentos) {
             return `${ENV.TICKETSOPORTE}/${formik.values.documentos}`;
         }
         return null;
     };*/

    const files = myFiles.map(file => (
        <span key={file.path}>
            {file.path}
            <Icon onClick={removeFile(file)} name='trash alternate' />
        </span>
    ))


    return (
        <Form className='soporte-form' onSubmit={formik.handleSubmit}>
            <Form.Dropdown className='soporte-form__servicio' label="Seleciona un Servicio" placeholder='Servicio....' options={servicios} selection clearable onChange={(_, data) => formik.setFieldValue("servicio", data.value)} value={formik.values.servicio} error={formik.errors.servicio} />
            <Form.TextArea className='soporte-form__descripcion' name='descripcion' placeholder='Solicitud o Incidencia' label="Ingresa la solicitud o incidencia" onChange={formik.handleChange} value={formik.values.descripcion} error={formik.errors.descripcion} />
            <h4>Agregar Archivos</h4>
            <div className='soporte-form__documentos' {...getRootProps()}>
                <Label>
                    Imágenes (jpg, png, jpeg), Archivos (.doc, .docx, .pdf, .xls, .xlsx, .csv)
                    <input {...getInputProps()} name="documentos" />
                    {isDragAccept && (<p>Imágenes (jpg, png, jpeg), Archivos (.doc, .docx, .pdf, .xls, .xlsx)</p>)}
                    {isDragReject && (<p>Otros tipos de Archivos son Rechazados</p>)}
                    {isDragActive && (<p>Suelta varios Archivos Aquí...</p>)}
                </Label>
            </div>
            {files}
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {soporte ? 'Revisar Ticket' : 'Crear Ticket'}
            </Form.Button>
        </Form>
    )
}
