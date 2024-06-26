import { Link } from 'react-router-dom'
import { memo } from 'react'

import path from '../../ultis/path'
import { appSlice } from '../../store/appSlice'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import * as apis from '../../apis'
import { userSlice } from '../../store/userSlice'

const ItemProductSearch = ({pid, image, sale, price, title, dispatch}) => {

    const handleClickSearch = async() => {
        dispatch(appSlice.actions.setShowOverlay(false))

        const response = await apis.addListSearched({title})
        if (response.data.success) {
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
        }
    }

    return (
        <Link 
            onClick={handleClickSearch} 
            to={`/${path.DETAIL_PRODUCT}/${pid}`} 
            className="flex items-center gap-2"
        >
            <img className="w-[60px] h-[60px] object-cover" src={image} alt="thuml"></img>

            <div>
                <p className='font-[500] text-[12px]'>{title}</p>
                <div className="flex items-center gap-2">
                    <p className="text-main text-[14px] ">{
                        sale ? Number(sale?.replace(/\D/g, "")).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                        : Number(price?.replace(/\D/g, "")).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                    }</p>
                    {sale && <p className="font-sm text-start text-[#707070] text-[15px] line-through">{Number(price?.replace(/\D/g, "")).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>}
                </div>
            </div>
        </Link>
    )
}

export default withBaseCompanent(memo(ItemProductSearch))