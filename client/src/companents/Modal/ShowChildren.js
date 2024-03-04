import { memo } from 'react'

import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import { appSlice } from '../../store/appSlice'

const ShowChildren = ({ children, dispatch }) => {
    return (
        <div 
            onScroll={(e) => e.stopPropagation()} 
            onClick={() => dispatch(appSlice.actions.setChildren(null))} 
            className='fixed w-screen h-screen flex justify-center items-center bg-overlay z-50' 
        >
            {children}
        </div>
    )
}

export default withBaseCompanent(memo(ShowChildren))