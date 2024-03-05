import React from 'react'
import {Form, Dropdown, Input, GridRow, GridColumn, Grid, Segment} from "semantic-ui-react";
import { useFormik } from 'formik';
import {initialValues, validationSchema} from "./InydeForm.form"
import { Mag } from '../../../../api';
import { useAuth } from '../../../../hooks';

const magController = new Mag();

const clasificacion = [
  {key: "FM", Text:"FM", value:"fm"},
  {key: "DC", Text:"DC", value:"dc"}
];

const TipoF = [
  {key: "Cerrada", Text:"Cerrada", value:"cd"},
  {key: "Atributos", Text:"Atributos", value:"at"}
];


export function InydeForm(props) {
  const {onClose, onReload, mag} = props;
  const dxp = mag._id.substring(24,18);
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
    <Grid columns={1}>
      <GridRow>
        <GridColumn>
        <Grid columns={2}>
      <GridRow>
        <GridColumn>
          ID
          <Segment>{mag.folio_IyD}</Segment>
        </GridColumn>
        <GridColumn>
          CLAVE FÓRMULA
          <Segment></Segment>
        </GridColumn>
      </GridRow>
    </Grid>
    <Grid columns={2}>
      <GridRow>
        <GridColumn>
          ASESOR
          <Segment>{mag.asesor}</Segment>
        </GridColumn>
        <GridColumn>
          MÉDICO
          <Segment>{mag.cardcode}</Segment>
        </GridColumn>
      </GridRow>
    </Grid>
    <Grid columns={2}>
      <GridRow>
        <GridColumn>
          ACTIVOS
          <Segment>{mag.activos}</Segment>
        </GridColumn>
        <GridColumn>
          BASE
          <Segment>{mag.base}</Segment>
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
          <Segment>{mag.especialidad}</Segment>
            </GridColumn>
            <GridColumn>
            CLASIFICACIÓN
          <Segment>{mag.clasi}</Segment>
            </GridColumn>
            <GridColumn>
            PADECIMIENTO
          <Segment>{mag.padecimiento}</Segment>
            </GridColumn>
          </GridRow>
        </Grid>
        <Grid columns={3}>
          <GridRow>
            <GridColumn>
            RECETA
          <Segment>{mag.receta}</Segment>
            </GridColumn>
            <GridColumn>
            EXCLUSIVO
          <Segment>{mag.excl}</Segment>
            </GridColumn>
            <GridColumn>
            REFRIGERACIÓN
          <Segment>{mag.refri}</Segment>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      <GridRow>
        <Grid columns={3}>
          <GridRow>
            <GridColumn>
            FÓRMULA EXISTENTE
          <Segment>{mag.existe}</Segment>
            </GridColumn>
            <GridColumn>
            CLAVE
          <Segment>{mag.clave_ex}</Segment>
            </GridColumn>
            <GridColumn>
            BASE
          <Segment>{mag.base_ex}</Segment>
            </GridColumn>
          </GridRow>
        </Grid>
      </GridRow>
      </Grid></>
  
  )
}
