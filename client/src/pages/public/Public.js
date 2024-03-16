import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../../companents'

const Public = () => {

    return (
        <div className='relative'>
            <div className='fixed z-50 w-full top-0'>
                <Header />
            </div>

            <div className='h-[64px]'></div>

            <Outlet />

            <div className='flex w-full justify-center border-t-2 pb-[20px]'>
                <div className='mt-3'>
                    <Footer />
                </div>
            </div>    
        </div>
    )
}

export default Public