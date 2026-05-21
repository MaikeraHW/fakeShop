import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './assets/components/layout/Layout'
import Home from './assets/pages/Home'
import Produtos from './assets/pages/Produtos'
import ProdutosDetalhes from './assets/pages/ProdutosDetalhes'


import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="produtos" element={<Produtos/>} />
          <Route path="produtos/:id" element={<ProdutosDetalhes/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
