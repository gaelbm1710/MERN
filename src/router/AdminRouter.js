import React from 'react';
import { Routes, Route } from "react-router-dom";
import {Auth, Users, Blog, Courses, Menu, Newsletter, Inyde, Ope, Opes, Opess, GestionComercial, Asesor, Omicronshoppagos, Presentacion, Princ,
  Transaccionescredito, Clientescreditos, Facturapagas, Cambiobase, Soporte, Inydes, Inydess, GestionComercials, GestionComercialss, MarkCatPromos,
  Markpromos,
  Markfacturas} from "../pages/admin";
import { AdminLayout } from "../layouts";
import { useAuth } from "../hooks";
import { Perfil } from '../pages/admin/Perfil';
 
export function AdminRouter() {
  const { user} = useAuth();  
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    )
  }
  return (
    <Routes>
      {!user ? (
        <Route path='/' element={<Auth />} />//login
      ) : (
        <>
          {["/admin", "/admin/Princ"].map((path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Princ)}// Donde esta "Courses" cambia la pagina de inicio
            />
          ))}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route path="/admin/courses" element={loadLayout(AdminLayout, Courses)} />
          <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
          <Route path="/admin/newsletter" element={loadLayout(AdminLayout, Newsletter)} />
          <Route path="/admin/blog" element={loadLayout(AdminLayout, Blog)} />
          <Route path="/admin/inyde" element={loadLayout(AdminLayout, Inyde)} />
          <Route path="/admin/inydes" element={loadLayout(AdminLayout, Inydes)} />
          <Route path="/admin/inydess" element={loadLayout(AdminLayout, Inydess)} />
          <Route path="/admin/ope" element={loadLayout(AdminLayout, Ope)} />
          <Route path="/admin/opes" element={loadLayout(AdminLayout, Opes)} />
          <Route path="/admin/opess" element={loadLayout(AdminLayout, Opess)} />
          <Route path="/admin/gestioncomercial" element={loadLayout(AdminLayout, GestionComercial)} />
          <Route path="/admin/gestioncomercials" element={loadLayout(AdminLayout, GestionComercials)} />
          <Route path="/admin/gestioncomercialss" element={loadLayout(AdminLayout, GestionComercialss)} />
          <Route path="/admin/asesor" element={loadLayout(AdminLayout, Asesor)} />
          <Route path="/admin/presentacion" element={loadLayout(AdminLayout, Presentacion)} />
          <Route path="/admin/omicronshoppagos" element={loadLayout(AdminLayout, Omicronshoppagos)} />
          <Route path="/admin/princ" element={loadLayout(AdminLayout, Princ)} />
          <Route path="/admin/transaccionescredito" element={loadLayout(AdminLayout, Transaccionescredito)} />
          <Route path="/admin/clientescreditos" element={loadLayout(AdminLayout, Clientescreditos)} />
          <Route path="/admin/facturapagas" element={loadLayout(AdminLayout, Facturapagas)} />
          <Route path="/admin/cambiobase" element={loadLayout(AdminLayout, Cambiobase)} />
          <Route path="/admin/soporte" element={loadLayout(AdminLayout, Soporte)} />
          <Route path="/admin/markcatpromos" element={loadLayout(AdminLayout, MarkCatPromos)} />
          <Route path="/admin/markpromos" element={loadLayout(AdminLayout, Markpromos)} />
          <Route path="/admin/markfacturas" element={loadLayout(AdminLayout, Markfacturas)} />
          <Route path="/admin/perfil" element={loadLayout(AdminLayout, Perfil)} />
        </>
      )
      }
    </Routes>
  )
}