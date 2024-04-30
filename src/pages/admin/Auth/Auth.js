import React, { useState } from 'react';
import { Tab, Image, Container } from "semantic-ui-react";
import { Icon } from "../../../assets";
import "./Auth.scss";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../assets/carousel/pexels-david-besh-884788.jpg";
import img2 from "../../../assets/carousel/pexels-dreamypixel-547115.jpg";
import img3 from "../../../assets/carousel/pexels-matthew-montrone-230847-1324803.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(0);
  const openLogin = () => setActiveIndex(0);
  const panes = [
    {
      menuItem: "Iniciar sesión",
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Crear usuario",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ]
  return (

    <div className='auth'>
      <div className="sidebar">
        <Carousel className='crsl' infiniteLoop autoPlay interval={5000} showThumbs={false}>
          <div>
            <Image src={img1} />
            <h1>Leyenda</h1>
          </div>
          <div>
            <Image src={img2} />
            <h1>Leyenda</h1>
          </div>
          <div>
            <Image src={img3} />
            <h1>Leyenda</h1>
          </div>
        </Carousel>
      </div>
      <div className="content">
        <Icon.LogoWhite className="logo" /><br />
        <Tab panes={panes} className="auth_forms" activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)} />
      </div>
    </div>
  )
}
