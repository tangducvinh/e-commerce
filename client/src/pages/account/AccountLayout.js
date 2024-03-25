import { Outlet } from "react-router-dom"

import { Header } from '../../companents'

const AccountLayout = () => {
    return (
        <div className="relative min-h-screen">
            <div className='fixed z-50 w-full top-0'>
                <Header />
            </div>

            <div className="h-[64px]"></div>

            <Outlet />

        </div>
    )
}

export default AccountLayout