import { Outlet } from 'react-router-dom'
import { Header } from '../../companents'

const Public = () => {
    return (
        <div>   
            <Header />


            <Outlet />    
        </div>

    )
}

export default Public