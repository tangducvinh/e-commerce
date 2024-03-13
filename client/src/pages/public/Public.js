import { Outlet } from 'react-router-dom'
import { Header, ShowChildren, Footer } from '../../companents'
import { ShowLoading } from '../../companents/Modal'
import { useSelector } from 'react-redux'


import { appSlice } from '../../store/appSlice'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const Public = ({ dispatch }) => {
    const { isLoading, children, showOverlay } = useSelector(state => state.app)

    return (
        <div className='relative'>
            {isLoading && 
                <div className='absolute z-50 w-full h-screen bg-overlay'>
                    <div className='w-screen h-screen flex justify-center items-center'>
                        <ShowLoading />
                    </div>
                </div>
            }

            {showOverlay && <div onClick={() => dispatch(appSlice.actions.setShowOverlay(false))} className='bg-overlay absolute w-full h-full z-50'></div>}

            {children && <ShowChildren children={children}/>}

            <div className='fixed z-50 w-full top-0'>
                <Header />
            </div>

            <div className='h-[64px]'></div>

            <Outlet />

            <div className='flex w-full justify-center border-t-2 mb-[20px]'>
                <div className='mt-3'>
                    <Footer />
                </div>
            </div>    
        </div>
    )
}

export default withBaseCompanent(Public)