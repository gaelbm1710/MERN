import React from 'react'
import {GridRow, GridColumn, Grid, Segment, Form, FormCheckbox, Checkbox, Input, FormButton, Dropdown} from "semantic-ui-react";
import { useFormik } from 'formik';
import {initialValues, validationSchema} from "./InydeForm.form"
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { getValue } from '@testing-library/user-event/dist/utils';

const magController = new Mag();
const handleChange=()=>{}

const clasificacion = [
  {key: "FM", Text:"FM", value:"FM"},
  {key: "DC", Text:"DC", value:"DC"}
];

const TipoF = [
  {key: "Cerrada", Text:"Cerrada", value:"cd"},
  {key: "Atributos", Text:"Atributos", value:"at"}
];


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
          ID<Segment>{mag.folio_IyD}</Segment>
        </GridColumn>
        <GridColumn>
          ASESOR<Segment>{mag.asesor}</Segment>
        </GridColumn>
      </GridRow>
    </Grid>
    <Grid columns={2}>
      <GridRow>
        <GridColumn>
          MÉDICO<Segment>{mag.cardcode}</Segment>
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
            <Dropdown placeholder="Clasificaciones" fluid selection options={TipoF} onChange={(_,data)=>formik.setFieldValue("clasificacion",data.value)} value={formik.values.clasificacion} error={formik.errors.clasificacion}/>
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
            RECETA<Segment><FormCheckbox name="receta" onChange={formik.handleChange} value={formik.values.receta} error={formik.errors.receta}/></Segment>
            </GridColumn>
            <GridColumn>
            EXCLUSIVO<Segment><FormCheckbox name="excl" onChange={formik.handleChange} value={formik.values.excl} error={formik.errors.excl}/></Segment>
            </GridColumn>
            <GridColumn>
            REFRIGERACIÓN<Segment><FormCheckbox name="refri" onChange={formik.handleChange} value={formik.values.refri} error={formik.errors.refri}/></Segment>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      <GridRow>
        <Grid columns={3}>
          <GridRow>
            <GridColumn>
            EXISTE<Segment><FormCheckbox name="existe" onChange={formik.handleChange} value={formik.values.existe} error={formik.errors.existe}/></Segment>
            </GridColumn>
            <GridColumn>
            CLAVE<Segment>{mag.clave_ex}</Segment>
            </GridColumn>
            <GridColumn>
            BASE<Segment>{mag.base_ex}</Segment>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      <GridRow>
        <Grid columns={2}>
          <GridRow>
            <GridColumn>
            TIPO DE FÓRMULA
            <select name='tipoF' onChange={formik.handleChange} value={formik.values.tipoF} error={formik.errors.tipoF}></select>
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
      <FormButton>Guardar</FormButton>
      </Form></>
  )
}
