import React, {useCallback} from 'react';
import {Form, Image} from "semantic-ui-react";
import {useFormik} from "formik";
import {initialValues, validationSchema} from "./UserForm.form"
import "./UserForm.scss";
import {useDropzone} from "react-dropzone";
import {image} from "../../../../assets";
import {User} from "../../../../api";
import {useAuth} from "../../../../hooks";
import {ENV} from "../../../../utils";

const userController = new User();


export function USerForm(props) {
    const {close, onReload, user} = props;
    const {accessToken} = useAuth();
    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async(formValue)=>{
            try {
                if(!user){
                    await userController.createUser(accessToken, formValue);
                }else{
                    await userController.updateUser(accessToken, user._id, formValue);
                }
                onReload();
                close();
            } catch (error) {
                console.error(error);
            }
        }
    })

    const roleOptions=[
        {
            key: "asesor",
            text: "Asesor",
            value: "user"
        },
        {
            key: "admin",
            text: "Administrador",
            value: "admin"
        },
        {
            key: "iyd",
            text: "Investigación y Desarrollo",
            value: "iyd"
        },
        {
            key: "ope",
            text: "Operaciones",
            value: "ope"
        },
        {
            key: "com",
            text: "Comercial",
            value: "com"
        },
        {
            key: "conta",
            text: "Contabilidad",
            value: "conta"
        },
        {
            key: "sistemas",
            text: "Sistemas",
            value: "sistemas"
        },
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDrop = useCallback((acceptedFiles) =>{
        const file = acceptedFiles[0];
        formik.setFieldValue("avatar", URL.createObjectURL(file))
        formik.setFieldValue("fileAvatar",file);
    });
    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/jpg, image/png",
        onDrop
    })

    const getAvatar=()=>{
        if(formik.values.fileAvatar){
            return formik.values.avatar;
        }else if(formik.values.avatar){
            return `${ENV.BASE_PATH}/${formik.values.avatar}`;
        }
        return image.noAvatar;
    }

  return (
    <Form className='user-form' onSubmit={formik.handleSubmit}>
        <div className='user-form__avatar' {...getRootProps()}>
            <input {...getInputProps()}/>
            <Image avatar size='small' src={getAvatar()}/>
        </div>
        <Form.Group widths="equal">
            <Form.Input name="firstname" placeholder="Nombre(s)" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
            <Form.Input name="lastname" placeholder="Apellidos" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname} />
        </Form.Group>
        <Form.Group widths="equal">
            <Form.Input name="email" placeholder="Correo" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
            <Form.Dropdown placeholder='Selecciona un Rol' options={roleOptions} selection onChange={(_,data) => formik.setFieldValue("role", data.value)} value={formik.values.role} error={formik.errors.role}/>
        </Form.Group>
        <Form.Input type='password' name="password" placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
            {user ? "Actualizar Usuario": "Crear usuario"}
        </Form.Button>
    </Form>
  )
}

