import { Link } from 'react-router-dom'
import { memo } from 'react'

import path from '../../ultis/path'
import { appSlice } from '../../store/appSlice'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const ItemProductSearch = ({pid, image, sale, price, title, dispatch}) => {
    return (
        <Link 
            onClick={() => dispatch(appSlice.actions.setShowOverlay(false))} 
            to={`/${path.DETAIL_PRODUCT}/${pid}`} 
            className="flex items-center gap-2"
        >
            <img className="w-[60px] h-[60px] object-cover" src={image} alt="thuml"></img>

            <div>
                <p className='font-[500] text-[12px]'>{title}</p>
                <div className="flex items-center gap-2">
                    <p className="text-main text-[14px] ">{sale || price}</p>
                    {sale && <p className="text-[#777777] text-[12px] line-through">{price}</p>}
                </div>
            </div>
        </Link>
    )
}

export default withBaseCompanent(memo(ItemProductSearch))