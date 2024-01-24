import { Outlet } from 'react-router-dom'
import { Loading } from '../../companents/Loading'

const AdminLayout = () => {
    return (
        <div>
            Admin

            <Loading />


            <Outlet />
        </div>
    )
}

export default AdminLayout