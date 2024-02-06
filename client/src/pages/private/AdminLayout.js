import { Outlet, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import path from '../../ultis/path'
import { AdminSidebar, FormEditInfor } from '../../companents'
import { appSlice } from '../../store/appSlice'

const AdminLayout = () => {
    const { isLoggedIn, dataCurrent } = useSelector(state => state.user)
    const { showEditForm } = useSelector(state => state.app)
    const dispatch = useDispatch()
    if (!isLoggedIn || !dataCurrent || dataCurrent.role !== '7') return <Navigate to={`/${path.LOGIN}`} replace={true} />

    return (
        <div className='relative'>
            {showEditForm && 
                <div 
                    onClick={() => dispatch(appSlice.actions.setShowEditForm(false))} 
                    className='flex absolute top-0 left-0 right-0 bottom-0 bg-overlay z-10'
                >
                    <div className='flex items-center justify-center w-screen h-screen'>
                        <FormEditInfor />
                    </div>
                </div>
            }

            <div className='flex justify-center'>
                <div className='w-[1500px] flex position gap-[30px] mt-[40px]'>
                    <div className='border w-[270px] fixed bg-[#F6FBFC] rounded-lg p-2'>
                        <AdminSidebar />
                    </div>

                    <div className='w-[270px]'></div>

                    <div className='flex-1'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout