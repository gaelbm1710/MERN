import React from 'react';
import { Menu, Icon, DropdownMenu, Dropdown } from "semantic-ui-react";
import "./AdminMenu.scss";
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../../hooks";

export function AdminMenu() {
  const { pathname } = useLocation();
  const { user: { role } } = useAuth();
  const isAdmin = role === "admin";
  const isIyd = role === "iyd";
  const isOpe = role === "ope";
  const isCom = role === "com";
  const isAse = role === "user";
  const isConta = role === "conta";
  const isSist = role === "sistemas";


  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  }
  return (
    <Menu fluid vertical icon text className='admin-menu'>
      {isAdmin && (
        <>
          <Dropdown item text='Administrador'>
            <DropdownMenu className='admin-menu-lista'>
              <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
                <Icon name='user outline' />
                Usuarios
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
                <Icon name='plus' />
                Menu
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/courses" active={isCurrentPath("/admin/courses")}>
                <Icon name='list' />
                Enlaces
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/newsletter" active={isCurrentPath("/admin/newsletter")} >
                <Icon name='newspaper' />
                Noticias
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
                <Icon name='users' />
                Blog
              </Menu.Item>
            </DropdownMenu>
          </Dropdown>
          <Dropdown item text='Gestión para Formulas'>
            <DropdownMenu className='admin-menu-lista'>
              <Menu.Item as={Link} to="/admin/inyde" active={isCurrentPath("/mag/cotizacion")}>
                <Icon name='lab' />
                Cotizaciones Magistrales
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/presentacion" active={isCurrentPath("/admin/presentacion")}>
                <Icon name='flask' />
                Cotización de Nueva Presentación
              </Menu.Item>
            </DropdownMenu>
          </Dropdown>
          <Dropdown item text="Contabilidad">
            <DropdownMenu className='admin-menu-lista'>
              <Menu.Item as={Link} to="/admin/omicronshoppagos" active={isCurrentPath("/admin/omicronshoppagos")}>
                <Icon name='money bill alternate outline' />
                Pagos de OmicronShop
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/transaccionescredito" active={isCurrentPath("/admin/transaccionescredito")}>
                <Icon name='money bill alternate outline' />
                Transacciones de Crédito
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/clientescreditos" active={isCurrentPath("/admin/clientescreditos")}>
                <Icon name='money bill alternate outline' />
                Clientes con Crédito
              </Menu.Item>
            </DropdownMenu>
          </Dropdown>
          <Dropdown item text='Ticket de Soporte'>
            <DropdownMenu className='admin-menu-lista'>
              <Menu.Item as="a" href="https://forms.office.com/pages/responsepage.aspx?id=pRffhtXT0kuFU3sNV6O3PBUZyAc4Wx5EiTVlITBFysBUNTRUM0QyRUszN1pSSUFTRlk5WEpIVklBMC4u" target="_blank">
                <Icon name='wrench' />
                Tickets de Soporte
              </Menu.Item>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
      {isSist && (
        <>
          <Dropdown item text='Administrador'>
            <DropdownMenu className='admin-menu-lista'>
              <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
                <Icon name='plus' />
                Menu
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
                <Icon name='user outline' />
                Usuarios
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/courses" active={isCurrentPath("/admin/courses")}>
                <Icon name='list' />
                Enlaces
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/newsletter" active={isCurrentPath("/admin/newsletter")} >
                <Icon name='newspaper' />
                Noticias
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
                <Icon name='users' />
                Blog
              </Menu.Item>
            </DropdownMenu>
          </Dropdown>
          <Dropdown item text='Ticket de Soporte'>
            <DropdownMenu className='admin-menu-lista'>
              <Menu.Item as="a" href="https://forms.office.com/pages/responsepage.aspx?id=pRffhtXT0kuFU3sNV6O3PBUZyAc4Wx5EiTVlITBFysBUNTRUM0QyRUszN1pSSUFTRlk5WEpIVklBMC4u" target="_blank">
                <Icon name='wrench' />
                Tickets de Soporte
              </Menu.Item>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
      {isIyd && (
        <Dropdown item text='Gestión para Formulas'>
          <DropdownMenu className='admin-menu-lista'>
            <Menu.Item as={Link} to="/admin/inyde" active={isCurrentPath("/admin/inyde")}>
              <Icon name='file alternate' />
              Generar Cotización Magistral Nueva
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/inydes" active={isCurrentPath("/admin/inydes")}>
              <Icon name='flask' />
              Cotización de Nueva Presentación
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/inydess" active={isCurrentPath("/admin/inydess")}>
              <Icon name='flask' />
              Cotizar cambio de Base
            </Menu.Item>
          </DropdownMenu>
        </Dropdown>
      )}
      {isOpe && (
        <Dropdown item text='Gestión para Formulas'>
          <DropdownMenu className='admin-menu-lista'>
            <Menu.Item as={Link} to="/admin/ope" active={isCurrentPath("/admin/ope")}>
              <Icon name='file alternate' />
              Generar Cotización Magistral Nueva
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/opes" active={isCurrentPath("/admin/opes")}>
              <Icon name='flask' />
              Cotización de Nueva Presentación
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/opess" active={isCurrentPath("/admin/opess")}>
              <Icon name='flask' />
              Cotizar cambio de Base
            </Menu.Item>
          </DropdownMenu>
        </Dropdown>
      )}
      {isCom && (
        <Dropdown item text='Gestión para Formulas'>
          <DropdownMenu className='admin-menu-lista'>
            <Menu.Item as={Link} to="/admin/come" active={isCurrentPath("/admin/ope")}>
              <Icon name='file alternate' />
              Generar Cotización Magistral Nueva
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/comes" active={isCurrentPath("/admin/comes")}>
              <Icon name='flask' />
              Cotización de Nueva Presentación
            </Menu.Item>
            <Menu.Item as={Link} to="/admin/comess" active={isCurrentPath("/admin/comess")}>
              <Icon name='flask' />
              Cotizar cambio de Base
            </Menu.Item>
          </DropdownMenu>
        </Dropdown>
      )}
      {isAse && (
          <Dropdown item text='Gestión para Formulas'>
            <DropdownMenu className='admin-menu-lista'>
              <Menu.Item as={Link} to="/admin/asesor" active={isCurrentPath("/admin/asesor")}>
                <Icon name='file alternate' />
                Generar Cotización Magistral Nueva
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/presentacion" active={isCurrentPath("/admin/presentacion")}>
                <Icon name='flask' />
                Cotización de Nueva Presentación
              </Menu.Item>
              <Menu.Item as={Link} to="/admin/cambiobase" active={isCurrentPath("/admin/cambiobase")}>
                <Icon name='flask' />
                Cotizar cambio de Base
              </Menu.Item>
            </DropdownMenu>
          </Dropdown>
      )}
      {isConta && (
        <>
          <Menu.Item as={Link} to="/admin/omicronshoppagos" active={isCurrentPath("/admin/omicronshoppagos")}>
            <Icon name='money bill alternate outline' />
            Pagos de OmicronShop
          </Menu.Item>
          <Menu.Item as={Link} to="/admin/transaccionescredito" active={isCurrentPath("/admin/transaccionescredito")}>
            <Icon name='money bill alternate outline' />
            Transacciones de Crédito
          </Menu.Item>
          <Menu.Item as={Link} to="/admin/clientescreditos" active={isCurrentPath("/admin/clientescreditos")}>
            <Icon name='money bill alternate outline' />
            Clientes con Crédito
          </Menu.Item>
          <Menu.Item as={Link} to="/admin/facturapagas" active={isCurrentPath("/admin/facturapagas")}>
            <Icon name='file' />
            Facturas pagadas
          </Menu.Item>
        </>
      )}
    </Menu>
  )
}
