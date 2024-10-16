import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Public, Home, Products, DetailProduct, Register, FinalRegister, ForgotPassword, ChangePassword, Checkout } from './pages/public'
import { AdminLayout, Dashboard, ManageOders, ManageProducts, ManagerUsers } from './pages/private'
import { MemberLayout, Personal, MyCart, WishList, History } from './pages/member'
import { AccountLayout } from './pages/account'
import path from './ultis/path'
import { fecthCategory } from './store/appSlice'
import { dataRegister, dataLogin } from './ultis/contants'
import { appSlice } from './store/appSlice'
import { ShowChildren } from './companents'

function App() {
  const dispatch = useDispatch()
  const { showOverlay, showOverlaySidebar, children, isLoading } = useSelector(state => state.app)
 
  useEffect(() => {
    dispatch(fecthCategory())
  }, [dispatch])
  
  return (
    <div className="font-main relative">
      {showOverlay && 
        <div 
            onScroll={(e) => e.stopPropagation()}
            onClick={() => dispatch(appSlice.actions.setShowOverlay(false))} 
            className='bg-overlay absolute w-full h-full z-30'
        >
        </div>
      }

      {showOverlaySidebar && 
        <div 
            onClick={() => dispatch(appSlice.actions.setShowOverlaySidebar(false))} 
            className='bg-overlay absolute w-full h-full z-20'
        >
        </div>
      }

      {children && 
        <ShowChildren children={children}/>
      }

      <Routes>
        <Route path={path.ACCOUNT} element={<AccountLayout />}>
          <Route path={path.LOGIN} element={<Register data={dataLogin}/>}/>
          <Route path={path.REGISTER} element={<Register data={dataRegister}/>}/>
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />}/>
          <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />}/>
        </Route>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}/>
          <Route path={path.PRODUCTS_CATEGORY} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT_PID} element={<DetailProduct />}/>
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManagerUsers />} />
          <Route path={path.MANAGE_BILL} element={<ManageOders />} />
        </Route>
        <Route path={path.MEMBER} element={< MemberLayout/>}>
          <Route path={path.CHECKOUT} element={<Checkout />}></Route>
          <Route path={path.PERSONAL} element={< Personal />} />
          <Route path={path.MYCART} element={< MyCart />} />
          <Route path={path.WISHLIST} element={< WishList />} />
          <Route path={path.HISTORY} element={< History />} />
        </Route> 
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}/>
      </Routes>
    </div>
  )
}

export default App;
