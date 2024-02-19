import { memo } from 'react'



const ShowChildren = ({ children }) => {
    return (
        <div onScroll={(e) => e.stopPropagation()} >
            {children}
        </div>
    )
}

export default memo(ShowChildren)