import React from 'react'
import "./Menu.scss";
import {Grid, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom"

export function Menu() {
  return (
    <div className='footer-menu'>
        <h4>Navegación</h4>
        <Grid columns={2}>
          <Grid.Column>
            <Link to="/">
              <Icon name='home' />Home
            </Link>
            <Link to="/blog">
              <Icon name='users' />Blog
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="https://forms.office.com/r/MY3HiTUsp0">
              <Icon name='help' />Soporte TI
            </Link>
            <Link to="https://www.o-lab.mx/">
              <Icon name='lab' />OmicronLab
            </Link>
          </Grid.Column>
        </Grid>
    </div>
  )
}
