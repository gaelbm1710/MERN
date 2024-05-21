import React from "react";
import { useAuth } from "../../../hooks";
import "./Princ.scss";

export function Princ() {
    const { user: { firstname, lastname } } = useAuth();
    const Nombre = firstname;
    const Apellido = lastname;
    return (
        <div className='princ-page'>
            <h1>¡Bienvenid@ a KAAPA!</h1><br />
            <h2>¡Hola {Nombre} {Apellido}!</h2><br />
            <h3>Tu plataforma digital diseñada para simplificar procesos y flujos de trabajo. Con su enfoque centrado en la eficiencia y la colaboración,
                ofrece una amplia gama de herramientas y funcionalidades para optimizar la gestión de tareas, proyectos y equipos.
            </h3><br />
            <h3>
                Esto no solo ahorra tiempo y esfuerzo, sino que también facilita la colaboración entre departamentos. Ofrece herramientas de análisis y
                seguimiento que permiten a los usuarios supervisar el progreso de sus proyectos en tiempo real y
                tomar decisiones informadas para mejorar la eficiencia y la productividad.
            </h3>

        </div>

    )
}