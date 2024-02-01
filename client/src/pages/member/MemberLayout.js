import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import path from '../../ultis/path'

const MenberLayout = () => {
    const { isLoggedIn, dataCurrent } = useSelector(state => state.user)

    console.log(isLoggedIn, dataCurrent)

    if (!isLoggedIn || !dataCurrent ) return <Navigate to={`/${path.LOGIN}`} replace={true} />

    return (
        <div>
            MenberLayout

            <Outlet />
        </div>
    )
}


export default MenberLayout