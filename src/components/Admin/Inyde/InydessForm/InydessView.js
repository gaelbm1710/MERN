import React from 'react'
import { Container } from 'semantic-ui-react';

export function InydessView(props) {
  const { mag } = props;
  return (
    <div className='cotizacion-principal'>
      <Container className='cotizacion-principal_info'>
        <p>Folio Investigación y Desarrollo: <span className='cotizacion-principal_info-dxp'>{mag.folio_IyD}</span></p>
        <p>Nombre del Asesor: <span className='cotizacion-principal_info-cliente'>{mag.asesornom}</span></p>
        <p>Nombre del Cliente: <span className='cotizacion-principal_info-cliente'>{mag.cliente}</span></p>
        <h4>Información de Formula Existente</h4>
        <p>Clave Existente: <span className='cotizacion-principal_info-cliente'>{mag.clave_ex}</span></p>
        <p>Base Existente: <span className='cotizacion-principal_info-cliente'>{mag.base_ex}</span></p>
        <h4>Información de Formula Nueva </h4>
        <p>Cambio de Base: <span className='cotizacion-principal_info-cliente'>{mag.base}</span></p>
        <p>Activos: <span className='cotizacion-principal_info-cliente'>{mag.activos}</span></p>
        <p>Padecimiento: <span className='cotizacion-principal_info-padecimiento'>{mag.padecimiento}</span></p>
        <p>Necesita Muestra: <span className='cotizacion-principal_info-muestra'>{mag.necesita_muestra ? 'Sí' : 'No'}</span></p>
        <p>Presentaciones: <span className='cotizacion-principal_info-presentacion'>{mag.presentacion}</span></p>
        <p>Clasificación: <span className='cotizacion-principal_info-presentacion'>{mag.clasi}</span></p>
        <p>Tipo de Formula: <span className='cotizacion-principal_info-presentacion'>{mag.tipoF}</span></p>
        <p>Caducidad: <span className='cotizacion-principal_info-presentacion'>{mag.caducidad}</span></p>
        <p>Necesita Receta: <span className='cotizacion-principal_info-muestra'>{mag.receta ? 'Sí' : 'No'}</span></p>
        <p>Presentaciones: <span className='cotizacion-principal_info-presentacion'>{mag.presentacion}</span></p>
        <p>Comentarios Asesor: <span className='cotizacion-principal_info-presentacion'>{mag.comeAsesor}</span></p>
        <p>Comentarios Internos: <span className='cotizacion-principal_info-presentacion'>{mag.comInt}</span></p>
        <p>Comentarios al Cliente: <span className='cotizacion-principal_info-presentacion'>{mag.comClie}</span></p>
        <p>Exclusiva: <span className='cotizacion-principal_info-presentacion'>{mag.excl ? 'Sí' : 'No'}</span></p>
        <p>Refrigeración: <span className='cotizacion-principal_info-presentacion'>{mag.refri ? 'Sí' : 'No'}</span></p>
      </Container>
    </div>
  )
}
