import React from "react";
import { useAuth } from "../../../hooks";
import "./Princ.scss";

export function Princ() {
    const { user: { firstname, lastname } } = useAuth();
    const Nombre = firstname;
    const Apellido = lastname;
    return (
        <div className='princ-page'>
            <h2>¡Bienvenido a KAAPA!</h2>
            <h4>Unificando flujos, simplificando procesos</h4>
            <h3>¡Hola {Nombre} {Apellido}!</h3>

            <h4>Kaapa es una pagina que realizamos para ayudarte a digitalizr y encapsular algunos y proximamente otros flujos de trabajo.</h4>
            <h4>Esperemos esto sea de tu agrado y si tienes más sugerencias de otro flujo de trabajo sin problema puedes acercarte al equipo de sistemas.</h4>
        </div>

    )
}