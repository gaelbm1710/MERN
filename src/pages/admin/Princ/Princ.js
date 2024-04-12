import React from "react";
import { useAuth } from "../../../hooks";
import "./Princ.scss";

export function Princ(){
    const {user: {firstname, lastname}} = useAuth();
    const Nombre = firstname;
    const Apellido = lastname;
    return(
        <h1>Hola {Nombre}{Apellido}</h1>
    )
}