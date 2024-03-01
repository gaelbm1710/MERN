import React from 'react'
import "./info.scss";
import {Button} from "semantic-ui-react";
import {map} from "lodash";
import {Icon} from "../../../../assets";

export function Info() {
  return (
    <div className='footer-info'>
        <Icon.LogoWhite className='logo'/>
        <p>
          Kappa es un sitio web donde podrás realizar actividades de manera digital sin la necesidad de intercambiar correos o estar escaneando hojas
          o algo así ya pensaremos que poner en este apartado
        </p>
    </div>
  )
}
