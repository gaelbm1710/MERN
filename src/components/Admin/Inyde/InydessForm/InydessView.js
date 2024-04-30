import React from 'react'
import { Container } from 'semantic-ui-react';

export function InydessView(props) {
  const {mag} = props;
  return (
    <div>
        <Container>
        <p>Cliente: <span className='cotizacion-principal_info-cliente'>{mag.cardcode}</span></p>
        <p>Clave Existente: <span className='cotizacion-principal_info-clave_ex'>{mag.clave_ex}</span></p>
        <p>Presentaciones: <span className='cotizacion-principal_info-presentacion'>{mag.presentacion}</span></p>
        <p>Satus Inves. y Desarollo: <span className='cotizacion-principal_info-sIyD'>{mag.sIyD? 'Finalizado' : 'Pendiente'}</span></p>
        <p>Satus Operaciones: <span className='cotizacion-principal_info-sOp'>{mag.sOp? 'Finalizado' : 'Pendiente'}</span></p>
        <p>Satus Gestión Comercial: <span className='cotizacion-principal_info-sCom'>{mag.sCom? 'Finalizado' : 'Pendiente'}</span></p>
        </Container>
    </div>
  )
}
