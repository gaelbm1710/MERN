import React, { useState } from 'react';
import { Tab, Image } from "semantic-ui-react";
import { Icon } from "../../../assets";
import "./Auth.scss";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../assets/carousel/KAAPA_Foto-1.png";
import img2 from "../../../assets/carousel/KAAPA_Foto-2.png";
import img3 from "../../../assets/carousel/KAAPA_Foto-3.png";
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
  ];

  return (
    <div className='auth'>
      <div className="sidebar">
        <Carousel className='crsl' infiniteLoop autoPlay interval={3500} showThumbs={false} showStatus={false}>
          <div>
            <Image src={img1} className="carousel-image" />
          </div>
          <div>
            <Image src={img2} className="carousel-image" />
          </div>
          <div>
            <Image src={img3} className="carousel-image" />
          </div>
        </Carousel>
      </div>
      <div className="content">
        <Icon.LogoWhite className="logo" />
        <Tab panes={panes} className="auth_forms" activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)} />
      </div>
    </div>
  );
}
