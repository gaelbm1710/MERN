import React from 'react';
import { Form, TableRow, TableBody, TableHeader, TableHeaderCell, Table, Container, TableCell } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues,validationSchema} from "./ComeForm.form";
import {Mag} from "../../../../api";
import {useAuth} from "../../../../hooks";
import "./ComeForm.scss";


const magController = new Mag();

export function ComeForm(props) {
  const { onClose, onReload, mag} = props;
  const {accessToken} = useAuth();
  const formik = useFormik({
    initialValues: initialValues(mag),
    validationSchema: validationSchema(mag),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data={
          folio_sCom: formValue.folio_sCom,
        }
        if(!mag){
          await magController.createMagCome(accessToken, data);
        }else{
          await magController.updateMagCome(accessToken, mag._id, data);
        };
        onClose();
        onReload();
      }catch (error) {
        console.error(error);
      }
    }

  });

  return (
    <Form className='ope-form' onSubmit={formik.handleSubmit}>

      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {mag ? "Actualizar Menu": "Crear Menu"}
      </Form.Button>
    </Form>
  );
}
