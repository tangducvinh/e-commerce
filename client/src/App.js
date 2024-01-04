import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { Public, Login, Home, Products, DetailProduct, Register } from './pages/public'
import path from './ultis/path'
import { fecthCategory } from './store/appSlice'
import { dataRegister, dataLogin } from './ultis/contants'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fecthCategory())
  }, [])
  
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.LOGIN} element={<Register data={dataLogin}/>}/>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT_PID} element={<DetailProduct />}/>
          <Route path={path.REGISTER} element={<Register data={dataRegister}/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
