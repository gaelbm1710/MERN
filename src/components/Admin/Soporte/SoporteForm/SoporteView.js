import React from 'react'
import { Container } from 'semantic-ui-react';

export function SoporteView(props) {
    const { soporte } = props;

    let vistaStatus;
    if (soporte.estado === 'Cancelado') {
        vistaStatus = <>
            <p># de Ticket: <span>{soporte.folio}</span></p>
            <p>Servicio: <span>{soporte.servicio}</span></p>
            <p>Descripción: <span>{soporte.descripcion}</span></p>
            <p>Creado por: <span>{soporte.dueno}</span></p>
            <p>Fecha de Creación: <span>{soporte.created_at}</span></p>
            <p>Estatus: <span>{soporte.estado}</span></p>
            <p>Fecha de Asignación: <span>{soporte.AsignDate}</span></p>
            <p>Motivo de Cancelación: <span>{soporte.MotivoCancel}</span></p>
            <p>Fecha de Cancelación: <span>{soporte.CancelDate}</span></p>
            <p><span></span></p>
        </>
    } else {
        vistaStatus = <>
            <p># de Ticket: <span>{soporte.folio}</span></p>
            <p>Servicio: <span>{soporte.servicio}</span></p>
            <p>Descripción: <span>{soporte.descripcion}</span></p>
            <p>Creado por: <span>{soporte.dueno}</span></p>
            <p>Fecha de Creación: <span>{soporte.created_at}</span></p>
            <p>Estatus: <span>{soporte.estado}</span></p>
            <p>Fecha de Asignación: <span>{soporte.AsignDate}</span></p>
        </>
    }

    return (
        <div className='soporte-view'>
            <Container className='soporte-view__info'>
                {vistaStatus}
            </Container>
        </div>
    )
}
