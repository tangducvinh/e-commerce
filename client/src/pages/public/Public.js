import { Outlet } from 'react-router-dom'
import { Header } from '../../companents'
import { ShowLoading } from '../../companents/Modal'
import { useSelector } from 'react-redux'

import { ShowChildren } from '../../companents'

const Public = () => {
    const { isLoading, children } = useSelector(state => state.app)

    return (
        <div className='relative'>
            {isLoading && 
                <div className='absolute z-50 w-full h-screen bg-overlay'>
                    <div className='w-screen h-screen flex justify-center items-center'>
                        <ShowLoading />
                    </div>
                </div>
            }

            {children && <ShowChildren children={children}/>}

            <Header />


            <Outlet />    
        </div>

    )
}

export default Public