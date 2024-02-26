import React from 'react'
import "./Banner.scss";
import {Container} from "semantic-ui-react"


export function Banner() {
  return (
    <div className='banner'>
        <Container>
            <h1>Hola Aún no sé para que es esto<br/> Esperemos sirva de algo
            </h1>
            <h2>Espero esto sirva de Algo</h2>
        </Container>
        <div className='banner__dark'>
        </div>
    </div>
  )
}
