import React from 'react'
import { TableRow, TableBody, TableHeader, TableHeaderCell, Table, Container, TableCell } from "semantic-ui-react";

export function InydesView(props) {
  const { mag } = props;
  return (
    <div className='cotizacion-principal'>
      <Container className='cotizacion-principal_info'>
        <p>Folio Investigación y Desarrollo: <span className='cotizacion-principal_info-dxp'>{mag.folio_IyD}</span></p>
        <p>Nombre del Asesor: <span className='cotizacion-principal_info-cliente'>{mag.asesornom}</span></p>
        <p>Nombre del Cliente: <span className='cotizacion-principal_info-cliente'>{mag.cliente}</span></p>
        <p>Clave Existente: <span className='cotizacion-principal_info-cliente'>{mag.clave_ex}</span></p>
        <p>Presentaciones: <span className='cotizacion-principal_info-presentacion'>{mag.presentacion}</span></p>
        <Table className='table-precio'>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Presentaciones</TableHeaderCell>
              <TableHeaderCell>Precios</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>7.5 ML</TableCell>
              <TableCell>{mag.precio1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>15 ML</TableCell>
              <TableCell>{mag.precio2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>30 ML</TableCell>
              <TableCell>{mag.precio3}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>60 ML</TableCell>
              <TableCell>{mag.precio4}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>120 ML</TableCell>
              <TableCell>{mag.precio5}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>240 ML</TableCell>
              <TableCell>{mag.precio6}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>480 ML</TableCell>
              <TableCell>{mag.precio7}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>960 ML</TableCell>
              <TableCell>{mag.precio8}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </div>

  )
}
