import React from 'react'
import {GridRow, GridColumn, Grid, Segment, Form, FormCheckbox, Checkbox, Input} from "semantic-ui-react";
import { useFormik } from 'formik';
import {initialValues, validationSchema} from "./InydeForm.form"
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { getValue } from '@testing-library/user-event/dist/utils';

const magController = new Mag();
const handleChange=()=>{}
/*
const clasificacion = [
  {key: "FM", Text:"FM", value:"fm"},
  {key: "DC", Text:"DC", value:"dc"}
];

const TipoF = [
  {key: "Cerrada", Text:"Cerrada", value:"cd"},
  {key: "Atributos", Text:"Atributos", value:"at"}
];
*/

export function InydeForm(props) {
  const {onClose, onReload, mag} = props;
 // const dxp = mag._id.substring(24,18);
  const {accessToken} = useAuth();
  const formik = useFormik({
    initialValues: initialValues(mag),
    validationSchema: validationSchema(mag),
    validateOnChange: false,
    onSubmit: async(formValue)=>{
      try {
        if(!mag){
          await magController.createMag(accessToken, formValue);
        }else{
          await magController.updateMag(accessToken, mag._id, formValue);
        }
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  });
  return (
    <>
    <Form>
      <Segment>
    <Grid columns={1} onSubmit={formik.handleSubmit}>
      <GridRow>
        <GridColumn>
        <Grid columns={2}>
      <GridRow>
        <GridColumn>
          ID
          <Form.Input name='folio_IyD' onChange={formik.handleChange} value={formik.values.folio_IyD} error={formik.errors.folio_IyD}/>
        </GridColumn>
        <GridColumn>
          ASESOR
          <Form.Input name='asesor' onChange={formik.handleChange} value={formik.values.asesor} error={formik.errors.asesor}/>
        </GridColumn>
      </GridRow>
    </Grid>
    <Grid columns={2}>
      <GridRow>
        <GridColumn>
          MÉDICO
          <Form.Input name='cardcode' onChange={formik.handleChange} value={formik.values.cardcode} error={formik.errors.cardcode}/>
        </GridColumn>
        <GridColumn>
          MUESTRA
          <Segment><FormCheckbox name="necesita_muestra" onChange={formik.handleChange} value={formik.values.necesita_muestra} error={formik.errors.necesita_muestra}/></Segment>
        </GridColumn>
      </GridRow>
    </Grid>
    <Grid columns={2}>
      <GridRow>
        <GridColumn>
          ACTIVOS
          <Form.Input name='activos' onChange={formik.handleChange} value={formik.values.activos} error={formik.errors.activos}/>
        </GridColumn>
        <GridColumn>
          BASE
          <Form.Input name='base' onChange={formik.handleChange} value={formik.values.base} error={formik.errors.base}/>
        </GridColumn>
      </GridRow>
    </Grid>
        </GridColumn>
      </GridRow>
      <GridRow>
        <Grid columns={3}>
          <GridRow>
            <GridColumn>
            ESPECIALIDAD
            <Form.Input name='especialidad' placeholder='7.5 ML' onChange={formik.handleChange} value={formik.values.especialidad} error={formik.errors.especialidad}/>
            </GridColumn>
            <GridColumn>
            CLASIFICACIÓN
            <select name='clasi' onChange={formik.handleChange} value={formik.values.clasi} error={formik.errors.clasi}></select>
            </GridColumn>
            <GridColumn>
            PADECIMIENTO
            <Form.Input name='padecimiento' onChange={formik.handleChange} value={formik.values.padecimiento} error={formik.errors.padecimiento}/>
            </GridColumn>
          </GridRow>
        </Grid>
        <Grid columns={3}>
          <GridRow>
            <GridColumn>
            RECETA
            <Form.Input name='receta' onChange={formik.handleChange} value={formik.values.receta} error={formik.errors.receta}/>
            </GridColumn>
            <GridColumn>
            EXCLUSIVO
            <Form.Input name='excl' onChange={formik.handleChange} value={formik.values.excl} error={formik.errors.excl}/>
            </GridColumn>
            <GridColumn>
            REFRIGERACIÓN
            <Form.Input name='refri' onChange={formik.handleChange} value={formik.values.refri} error={formik.errors.refri}/>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      <GridRow>
        <Grid columns={3}>
          <GridRow>
            <GridColumn>
            FÓRMULA EXISTENTE
            <Form.Input name='existe' onChange={formik.handleChange} value={formik.values.existe} error={formik.errors.existe}/>
            </GridColumn>
            <GridColumn>
            CLAVE
            <Form.Input name='clave_ex' onChange={formik.handleChange} value={formik.values.clave_ex} error={formik.errors.clave_ex}/>
            </GridColumn>
            <GridColumn>
            BASE
            <Form.Input name='base_ex' onChange={formik.handleChange} value={formik.values.base_ex} error={formik.errors.base_ex}/>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      <GridRow>
        <Grid columns={2}>
          <GridRow>
            <GridColumn>
            TIPO DE FÓRMULA
            <Form.Input name='tipoF' onChange={formik.handleChange} value={formik.values.tipoF} error={formik.errors.tipoF}/>
            </GridColumn>
            <GridColumn>
            CADUCIDAD
            <Form.Input name='caducidad' onChange={formik.handleChange} value={formik.values.caducidad} error={formik.errors.caducidad}/>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      <GridRow>
        <Grid columns={1}>
          <GridRow>
            <GridColumn>
            INFORMACIÓN DEL DESARROLLO
            <Form.Input name='infoDes' onChange={formik.handleChange} value={formik.values.infoDes} error={formik.errors.infoDes}/>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      <GridRow>
        <Grid columns={2}>
          <GridRow>
            <GridColumn>
            COMENTARIOS INTERNOS
            <Form.Input name='comInt' onChange={formik.handleChange} value={formik.values.comInt} error={formik.errors.comInt}/>
            </GridColumn>
            <GridColumn>
            COMENTARIOS CLIENTES
            <Form.Input name='comClie' onChange={formik.handleChange} value={formik.values.comClie} error={formik.errors.comClie}/>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      </Grid>
      </Segment>
      </Form></>
  )
}
