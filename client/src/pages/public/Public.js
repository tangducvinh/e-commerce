import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../../companents'
import { ShowLoading } from '../../companents/Modal'
import { useSelector } from 'react-redux'

import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const Public = ({ dispatch }) => {
    const { isLoading } = useSelector(state => state.app)

    return (
        <div className='relative'>
            {isLoading && 
                <div className='absolute z-50 w-full h-screen bg-overlay'>
                    <div className='w-screen h-screen flex justify-center items-center'>
                        <ShowLoading />
                    </div>
                </div>
            }

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

export default withBaseCompanent(Public)