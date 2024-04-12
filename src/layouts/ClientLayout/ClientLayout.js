import React from 'react';
import {Container} from "semantic-ui-react";
import "./ClientLayout.scss";
export function ClientLayout(props) {
    const {children} = props;  
    return (
    <div className='client-layout'>
        <div className='client-layout__header'>
        </div>
        {children}
        <div className='client-layout__footer'>
          <Container>
            <span>©ALL RIGHTS RESERVED BY HEROICO CUERPO DE TI</span>
          </Container>
        </div>
    </div>
  )
}
