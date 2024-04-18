import React from "react";
import { useAuth } from "../../../hooks";
import "./Princ.scss";

export function Princ(){
    const {user: {firstname, lastname}} = useAuth();
    const Nombre = firstname;
    const Apellido = lastname;
    return(
        <div className='princ-page'>
            <h2>¡Bienvenido a KAAPA!</h2>
            <h4>Unificando flujos, simplificando procesos</h4>
            <h3>Hola {Nombre} {Apellido}</h3>
        </div>
        
    )
}