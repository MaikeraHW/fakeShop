import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './assets/components/layout/Layout'
import Home from './assets/pages/Home'
import ProdutosSuspense from './assets/pages/ProdutosSuspense'
import ProdutosDetalhesSuspense from './assets/pages/ProdutosDetalhesSuspense'


import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="produtos" element={<ProdutosSuspense/>} />
          <Route path="produtos/:id" element={<ProdutosDetalhesSuspense/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
