import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { WebRouter,AdminRouter } from "./router"
import { AuthProvider } from "./contexts";

export default function App() {
  const port = process.env.port || 8080
  return (

    <BrowserRouter>
      <AuthProvider>
        <WebRouter />
        <AdminRouter />
      </AuthProvider>
    </BrowserRouter>

  )
}