import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logokaapa from "../../assets/svg/KAAPA2-Logo-2.svg";
import "./AdminLayout.scss";
import { AdminMenu, Logout } from "../../components/Admin/AdminLayout"

export function AdminLayout(props) {
  const { children } = props;
  return (
    <div className='admin-layout'>
      <div className='admin-layout__left'>
        <Link to="/admin/Princ" >
          <Image src={logokaapa} />
        </Link>
        <AdminMenu />
        <div className='admin-layout__left-bar'></div>

      </div>
      <div className='admin-layout__right'>
        <div className='admin-layout__right-header'>
          <Logout />
        </div>
        <div className='admin-layout__right-content'>
          {children}
        </div>
      </div>
    </div>
  )
}
