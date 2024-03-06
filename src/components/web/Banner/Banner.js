import React from 'react'
import "./Banner.scss";
import {Container} from "semantic-ui-react"


export function Banner() {
  return (
    <div className='banner'>
        <Container>
            <h1>¡Bienvenido a Kappa!</h1>
            <h2>Aquí podrás realizar varias actividades para completar tu labor</h2>
        </Container>
        <div className='banner__dark'>
        </div>
    </div>
  )
}
