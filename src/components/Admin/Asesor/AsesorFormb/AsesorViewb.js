import React from 'react'
import { Container } from 'semantic-ui-react';


export function AsesorViewb(props) {
  const { mag } = props;

  return (
    <>
      <Container className='cotizacion-principal_info'>
        <p>Cotización: <span className='cotizacion-principal_info-dxp'>{mag.folio}</span></p>
        <p>Cliente: <span className='cotizacion-principal_info-cliente'>{mag.cardcode}</span></p>
        <p>Clave Existente: <span className='cotizacion-principal_info-clave_ex'>{mag.clave_ex}</span></p>
        <p>Base Existente: <span className='cotizacion-principal_info-base'>{mag.base_ex}</span></p>
        <h3>Datos de Formula Nueva</h3>
        <p>Base: <span className='cotizacion-principal_info-activos'>{mag.base}</span></p>
        <p>Activos: <span className='cotizacion-principal_info-activos'>{mag.activos}</span></p>
        <p>Necesita Muestra: <span className='cotizacion-principal_info-muestra'>{mag.necesita_muestra ? 'Sí' : 'No'}</span></p>
        <p>Presentaciones: <span className='cotizacion-principal_info-presentacion'>{mag.presentacion}</span></p>
        <p>Satus Inves. y Desarollo: <span className='cotizacion-principal_info-sIyD'>{mag.sIyD ? 'Finalizado' : 'Pendiente'}</span></p>
        <p>Satus Operaciones: <span className='cotizacion-principal_info-sOp'>{mag.sOp ? 'Finalizado' : 'Pendiente'}</span></p>
        <p>Satus Gestión Comercial: <span className='cotizacion-principal_info-sCom'>{mag.sCom ? 'Finalizado' : 'Pendiente'}</span></p>
      </Container>
    </>
  )
}
