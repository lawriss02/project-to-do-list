import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style/index.css'
import {WelcomePage} from '../pages/WelcomePage.jsx'
import {UserContext} from "../context/context.jsx"
import {ListPage} from '../pages/ListPage.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  </StrictMode>,
)