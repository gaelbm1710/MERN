import React from 'react';
import {Routes, Route} from "react-router-dom";
import {Auth,Princ} from "../pages/admin";
import { useAuth } from "../hooks";
import { AdminLayout } from "../layouts";
 
 
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
         {["/admin", "/admin/Princ"].map((path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Princ)}// Donde esta "Courses" cambia la pagina de inicio
            />
          ))}
       
        </>
      )}
    </Routes>
  )
}