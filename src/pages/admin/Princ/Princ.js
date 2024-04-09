import React from "react";
import { useAuth } from "../../../hooks";
import "./Princ.scss";

export function Princ(){
    const {user: {firstname, lastname}} = useAuth();
    const Nombre = firstname;
    const Apellido = lastname;
    return(
        <div className="principal">
            <div className="principal-bienvenida">
                <h1>Bienvenido a KAAPA</h1>
                <h2>¡Hola {Nombre} {Apellido} !</h2>
            </div>
            <div className="principal-intro">
                <h3>
                    Esto es KAAPA, una plataforma en la que podrás realizar actividades de trabajo. Aún está en desarrollo, pero si eres de los pocos que lo utilizan
                    te damos las gracias por la paciencia y el querer digitalizar sus herramientas de trabajo
                </h3>
            </div>
        </div>
    )
}