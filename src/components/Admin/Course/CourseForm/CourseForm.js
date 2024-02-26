import React, {useCallback} from 'react';
import "./CourseForm.scss";
import {Form, Image} from "semantic-ui-react";
import {useDropzone} from "react-dropzone";
import {useFormik} from "formik";
import {initialValues, validationSchema} from "./CourseForm.form";
import {Course} from "../../../../api";
import {useAuth} from "../../../../hooks";
import {ENV} from "../../../../utils"

const courseController = new Course();

export function CourseForm(props) {
    const {onClose, onReload, course} = props;
    const {accessToken} = useAuth();
    const formik = useFormik({
        initialValues: initialValues(course),
        validationSchema: validationSchema(course),
        validateOnChange: false,
        onSubmit: async(formValue)=>{
            try {
                if(!course){
                    await courseController.createCourse(accessToken, formValue);
                }else{
                    await courseController.updateCourse(accessToken, course._id, formValue);
                }
                onReload();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    const onDrop = useCallback((acceptedFiles) =>{
        const file = acceptedFiles[0];
        formik.setFieldValue("miniature", URL.createObjectURL(file))
        formik.setFieldValue("file",file);
    });

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/jpg, image/png",
        onDrop
    })

    const getMiniature = () =>{
        if(formik.values.file){
            return formik.values.miniature;
        }else if(formik.values.miniature){
            return `${ENV.BASE_PATH}/${formik.values.miniature}`;
        }
        return null;
    };

  return (
    <Form className='course-form' onSubmit={formik.handleSubmit}>
        <div className='course-form__miniature' {...getRootProps()}>
            <input {...getInputProps()}/>
            {getMiniature() ? (
                <Image size='small' src={getMiniature()}/>
            ) : (
                <div>
                    <span>Arrastra la Imagen</span>
                </div>
            )
            }
        </div>
        <Form.Input name="tittle" placeholder="Titulo del Enlace" onChange={formik.handleChange} value={formik.values.tittle} error={formik.errors.tittle}/>
        <Form.Input name="url" placeholder="URL/Link del enlace " onChange={formik.handleChange} value={formik.values.url} error={formik.errors.url} />
        <Form.TextArea name="description" placeholder="Descripción del Enlace" 
        onChange={formik.handleChange} value={formik.values.description} error={formik.errors.description}/>
        <Form.Group widths='equal'>
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {!course ? "Crear Enlace" : "Actualizar Enlace"}
            </Form.Button>
        </Form.Group>
    </Form>
  )
}
