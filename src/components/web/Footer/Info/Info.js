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
          Este es un desarrollo que sepa dios para que es, pero pues funciona JEJEJEJEJEJEJEJE
        </p>
    </div>
  )
}
