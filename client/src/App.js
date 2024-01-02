import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { Public, Login, Home, Products, DetailProduct } from './pages/public'
import path from './ultis/path'
import { fecthCategory } from './store/appSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fecthCategory())
  }, [])
  
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT_PID} element={<DetailProduct />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
