import React, {useCallback} from 'react'
import { Form } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './SoporteForm.form';
import { Soporte } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ENV } from '../../../../utils';

const servicios = [
    {key:"SoporteTecnico", text:"Soporte Técnico", value:"SoporteTecnico"},
    {key:"SoporteSistemas", text:"Soporte Sistemas", value:"SoporteSistemas"},
    {key:"DMR", text:"Desarrollo o modificaciones de Reportes", value:"DMR"},
    {key:"otro", text:"Otro", value:"otro"}
]


const soporteController = new Soporte();
export function SoporteForm(props) {
    const {onClose, onReload, soporte} = props;
    const {accessToken} = useAuth();
    const {user: {email}} = useAuth();
    const CorreoDueno = email;
    const formik = useFormik({
        initialValues: initialValues(soporte, CorreoDueno),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                if(!soporte){
                    await soporteController.createTicket(accessToken, formValue);
                }else{
                    await soporteController.updateTicket(accessToken, soporte._id, formValue);
                }
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDrop = useCallback((acceptedFiles) =>{
        const file = acceptedFiles[0];
        formik.setFieldValue("documentos", URL.createObjectURL(file))
        formik.setFieldValue("file",file);
    });

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation",
        onDrop
    })

    const getDocumento = () =>{
        if(formik.values.documentos){
            return formik.values.documentos;
        }else if(formik.values.documentos){
            return `${ENV.BASE_PATH}/${formik.values.documentos}`;
        }
        return null;
    }


  return (
    <Form className='ticket-form' onSubmit={formik.handleSubmit}>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {getDocumento() ?(
                // eslint-disable-next-line jsx-a11y/heading-has-content
                <h3 src={getDocumento}></h3>
            ):(
                <div>
                    <span>Agregar Documento</span>
                </div>
            )}
        </div>
        <Form.Dropdown label="Elige un tipo de Servicio" placeholder="Servicios" fluid selection multiple options={servicios} onChange={(_,data)=>formik.setFieldValue("servicio",data.value)} value={formik.values.servicio || []} error={formik.errors.servicio}/>
    </Form>
  )
}
