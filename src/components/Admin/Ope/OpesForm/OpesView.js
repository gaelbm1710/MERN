import React from 'react'
import { TableRow, TableBody, TableHeader, TableHeaderCell, Table, Container, TableCell } from "semantic-ui-react";


export function OpeView(props) {
    const { mag } = props;
    return (
        <div className='cotizacion-principal'>
            <Container className='cotizacion-principal_info'>
                <p>Folio de Operaciones: <span className='cotizacion-principal_info-dxp'>{mag.folio_Op}</span></p>
                <p>Nombre del Asesor: <span className='cotizacion-principal_info-cliente'>{mag.asesornom}</span></p>
                <p>Nombre del Cliente: <span className='cotizacion-principal_info-cliente'>{mag.cliente}</span></p>
                <p>Especialidad: <span className='cotizacion-principal_info-especialidad'>{mag.especialidad}</span></p>
                <p>Base: <span className='cotizacion-principal_info-base'>{mag.base}</span></p>
                <p>Activos: <span className='cotizacion-principal_info-activos'>{mag.activos}</span></p>
                <p>Padecimiento: <span className='cotizacion-principal_info-padecimiento'>{mag.padecimiento}</span></p>
                <p>Necesita Muestra: <span className='cotizacion-principal_info-muestra'>{mag.necesita_muestra ? 'Sí' : 'No'}</span></p>
                <p>Presentaciones: <span className='cotizacion-principal_info-presentacion'>{mag.presentacion}</span></p>
                <p>Clasificación: <span className='cotizacion-principal_info-presentacion'>{mag.clasi}</span></p>
                <p>Tipo de Formula: <span className='cotizacion-principal_info-presentacion'>{mag.tipoF}</span></p>
                <p>Caducidad: <span className='cotizacion-principal_info-presentacion'>{mag.caducidad}</span></p>
                <p>Necesita Receta: <span className='cotizacion-principal_info-muestra'>{mag.receta ? 'Sí' : 'No'}</span></p>
                <p>Información: <span className='cotizacion-principal_info-presentacion'>{mag.infoDesa}</span></p>
                <p>Comentarios Asesor: <span className='cotizacion-principal_info-presentacion'>{mag.comeAsesor}</span></p>
                <p>Comentarios Internos: <span className='cotizacion-principal_info-presentacion'>{mag.comInt}</span></p>
                <p>Comentarios al Cliente: <span className='cotizacion-principal_info-presentacion'>{mag.comClie}</span></p>
                <p>Exclusiva: <span className='cotizacion-principal_info-presentacion'>{mag.excl ? 'Sí' : 'No'}</span></p>
                <p>Refrigeración: <span className='cotizacion-principal_info-presentacion'>{mag.refri ? 'Sí' : 'No'}</span></p>
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
