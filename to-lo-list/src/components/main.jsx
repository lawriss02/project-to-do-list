import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style/index.css'
import {WelcomePage} from '../pages/WelcomePage.jsx'
import {UserContext} from "../context/context.jsx"
import {ListPage} from '../pages/ListPage.jsx'
import { HashRouter, Routes, Route } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <HashRouter>
        <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/list" element={<ListPage/>} />
        </Routes>
      </HashRouter>
    </UserContext>
  </StrictMode>,
)