import React from 'react'
import { Container } from 'semantic-ui-react';


export function AsesorViewa(props) {
  const { mag } = props;
  return (
    <div className='cotizacion-principal'>
      <Container className='cotizacion-principal_info'>
        <p>Cotización: <span className='cotizacion-principal_info-dxp'>{mag.folio}</span></p>
        <p>CardCode Cliente: <span className='cotizacion-principal_info-cliente'>{mag.cardcode}</span></p>
        <p>Nombre del Cliente: <span className='cotizacion-principal_info-cliente'>{mag.cliente}</span></p>
        <p>Clave Existente: <span className='cotizacion-principal_info-clave_ex'>{mag.clave_ex}</span></p>
        <p>Presentaciones: <span className='cotizacion-principal_info-presentacion'>{mag.presentacion}</span></p>
      </Container>
    </div>
  )
}
