import React from 'react';
import {Routes, Route} from "react-router-dom";
import {
  Auth, Users, Blog, Courses, Menu, Newsletter, Inyde, Ope, GestionComercial, Asesor, Omicronshoppagos, Presentacion, Princ,
  Transaccionescredito, Clientescreditos, Facturapagas, Cambiobase, Soporte
} from "../pages/admin";
import { AdminLayout } from "../layouts";
import { useAuth } from "../hooks";

export function WebRouter() {
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
        <Route path="/" element={<Auth />} /> //login
      ) : (
        <>
          
        </>
      )}
    </Routes>
  )
}
