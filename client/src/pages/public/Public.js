import { Outlet } from 'react-router-dom'
import { Header } from '../../companents'
import { ShowLoading } from '../../companents/Modal'
import { useSelector } from 'react-redux'



const Public = () => {
    const { isLoading } = useSelector(state => state.app)

    console.log(isLoading)

    return (
        <div className='relative'>
            {isLoading && 
                <div className='absolute z-50 w-full h-screen bg-overlay'>
                    <div className='w-screen h-screen flex justify-center items-center'>
                        <ShowLoading />
                    </div>
                </div>
            }

            <Header />


            <Outlet />    
        </div>

    )
}

export default Public