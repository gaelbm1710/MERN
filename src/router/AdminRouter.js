import React from 'react';
import { Routes, Route } from "react-router-dom";
import {Auth, Users, Blog, Courses, Menu, Newsletter, Inyde, Ope, GestionComercial, Asesor, Omicronshoppagos, Presentacion, Princ,
  Transaccionescredito, Clientescreditos, Facturapagas, Cambiobase, Soporte} from "../pages/admin";
import { AdminLayout } from "../layouts";
import { useAuth } from "../hooks";

export function AdminRouter() {
  const { user } = useAuth();
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
        <Route path="/admin/*" element={<Auth />} /> //login
      ) : (
        <>
          {["/admin", "/admin/Princ"].map((path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Princ)} /> // Donde esta "Courses" cambia la pagina de inicio
          ))}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route path="/admin/courses" element={loadLayout(AdminLayout, Courses)} />
          <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
          <Route path="/admin/newsletter" element={loadLayout(AdminLayout, Newsletter)} />
          <Route path="/admin/blog" element={loadLayout(AdminLayout, Blog)} />
          <Route path="/admin/inyde" element={loadLayout(AdminLayout, Inyde)} />
          <Route path="/admin/ope" element={loadLayout(AdminLayout, Ope)} />
          <Route path="/admin/gestioncomercial" element={loadLayout(AdminLayout, GestionComercial)} />
          <Route path="/admin/asesor" element={loadLayout(AdminLayout, Asesor)} />
          <Route path="/admin/presentacion" element={loadLayout(AdminLayout, Presentacion)} />
          <Route path="/admin/omicronshoppagos" element={loadLayout(AdminLayout, Omicronshoppagos)} />
          <Route path="/admin/omicronshoppagos" element={loadLayout(AdminLayout, Princ)} />
          <Route path="/admin/transaccionescredito" element={loadLayout(AdminLayout, Transaccionescredito)} />
          <Route path="/admin/clientescreditos" element={loadLayout(AdminLayout, Clientescreditos)} />
          <Route path="/admin/facturapagas" element={loadLayout(AdminLayout, Facturapagas)} />
          <Route path="/admin/cambiobase" element={loadLayout(AdminLayout, Cambiobase)} />
          <Route path="/admin/soporte" element={loadLayout(AdminLayout, Soporte)} />
        </>
      )}
    </Routes>
  )
}
