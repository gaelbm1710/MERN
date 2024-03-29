import React from 'react'
import { Form, Dropdown, Container } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValuesb, validationSchemab } from './AsesorForma.form'
import { Mag } from '../../../../api'
import { useAuth } from '../../../../hooks'
import "./AsesorForm.scss";

const presentaciones =[
    {key:"7.5ML", text:"7.5 ML", value:"7.5 ML"},
    {key:"15ML", text:"15 ML", value:"15 ML"},
    {key:"30ML", text:"30 ML", value:"30 ML"},
    {key:"60ML", text:"60 ML", value:"60 ML"},
    {key:"120ML", text:"120 ML", value:"120 ML"},
    {key:"240ML", text:"240 ML", value:"240 ML"},
    {key:"480ML", text:"480 ML", value:"480 ML"},
    {key:"960ML", text:"960 ML", value:"960 ML"},
];


const magController = new Mag();

export function AsesorFormb(props) {
    const {onClose, onReload, mag} = props
    const {accessToken} = useAuth();
    const {user: {email}} = useAuth();
    const CorreoAsesor = email;
    const formik = useFormik({
        initialValues: initialValuesb(mag),
        validationSchema: validationSchemab(),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                const data={
                    cardcode: formValue.cardcode,
                    asesor: formValue.asesor,
                    presentacion: formValue.presentacion,
                    clave_ex: formValue.clave_ex
                };
                if(!mag){
                    await magController.createMagCome(accessToken, data)
                }else{
                    await magController.updateMag(accessToken, mag._id ,data)
                }
                onClose();
                onReload();
            } catch (error) {
                console.error(error);
            }
        }
    });

  return (
    <Form onSubmit={formik.handleSubmit}>
        <Container  className='form-cotizacion__primer'>
            <Form.Input name="asesor" placeholder="Correo de asesor" onChange={formik.handleChange} value={CorreoAsesor} />
            <Form.Input name="cardcode" placeholder="CardCode del Cliente" onChange={formik.handleChange} value={formik.values.cardcode} error={formik.errors.cardcode}/>
        </Container>
        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
            {mag ? "Revisar Cotización": "Crear cotización"}
        </Form.Button>
    </Form>
  )
}
