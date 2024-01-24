import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { Public, Home, Products, DetailProduct, Register, FinalRegister, ForgotPassword, ChangePassword } from './pages/public'
import { AdminLayout, Dashboard } from './pages/private'
import path from './ultis/path'
import { fecthCategory } from './store/appSlice'
import { dataRegister, dataLogin } from './ultis/contants'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fecthCategory())
  }, [dispatch])
  
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.LOGIN} element={<Register data={dataLogin}/>}/>
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />}/>
          <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />}/>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT_PID} element={<DetailProduct />}/>
          <Route path={path.REGISTER} element={<Register data={dataRegister}/>}/>
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}/>
      </Routes>
    </div>
  )
}

export default App;
