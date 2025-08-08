
import React, { useState } from 'react'
import Home from './pages/Home.jsx'
import Vistoria from './pages/Vistoria.jsx'

export default function App() {
  const [auth, setAuth] = useState(false)
  return auth ? <Vistoria onLogout={() => setAuth(false)} /> : <Home onLogin={() => setAuth(true)} />
}
