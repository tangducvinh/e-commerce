import { Outlet } from 'react-router-dom'
import { Header } from '../../companents'
import { ShowLoading } from '../../companents/Modal'

const Public = () => {
    return (
        <div className='relative'>
            <div className='absolute z-50 w-full h-full bg-overlay'>
                <div className='w-screen h-screen flex justify-center items-center'>
                    <ShowLoading />
                </div>
            </div>

            <Header />


            <Outlet />    
        </div>

    )
}

export default Public