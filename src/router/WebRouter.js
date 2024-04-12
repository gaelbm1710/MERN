import React from 'react';
import {Routes, Route} from "react-router-dom";
import {Auth} from "../pages/admin";
import { useAuth } from "../hooks";

export function WebRouter() {
  const { user } = useAuth();
  return (
    <Routes>
      {!user ? (
        <Route path="/" element={<Auth />} /> //login
      ) : (
        console.log(user)
      )}
    </Routes>
  )
}
