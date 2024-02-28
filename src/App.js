import React from 'react'
import {BrowserRouter, Router, Route, Switch} from "react-router-dom"
import {WebRouter, AdminRouter} from "./router"
import {AuthProvider} from "./contexts";

export default function App(){
  return(
    <AuthProvider>
    <BrowserRouter>
    <WebRouter/>
    <AdminRouter/>
    </BrowserRouter>
    </AuthProvider>
  )
}