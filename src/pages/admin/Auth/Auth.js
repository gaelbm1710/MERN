import React, {useState} from 'react';
import {Tab} from "semantic-ui-react";
import {Icon} from "../../../assets";
import "./Auth.scss";
import {RegisterForm, LoginForm} from "../../../components/Admin/Auth"


export function Auth() {
  const [activeIndex, setActiveIndex] = useState(0);
  const openLogin = ()=> setActiveIndex(0);
  
  const panes = [
    {
      menuItem: "Iniciar sesión",
      render: ()=>(
        <Tab.Pane>
         <LoginForm/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Crear usuario",
      render: ()=>(
        <Tab.Pane>
         <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
]
  return (
    <div className='auth'>
      <Icon.LogoWhite className="logo"/><br/>
        <Tab panes={panes} className="auth_forms" activeIndex={activeIndex} onTabChange={(_, data)=>setActiveIndex(data.activeIndex)}/>
    </div>
  )
}
