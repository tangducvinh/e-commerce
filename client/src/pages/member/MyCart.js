import { useSelector } from 'react-redux'
import { useState, useCallback, Fragment } from 'react'

import { ItemProductMyCart } from '../../companents'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import icons from '../../ultis/icons'
import * as apis from '../../apis'
import { userSlice } from '../../store/userSlice'

const MyCart = ({ dispatch}) => {
    const { dataCurrent } = useSelector(state => state.user)
    const [ checks, setChecks ] = useState([])
    const { FaCircleCheck } = icons

    const handleCheck = useCallback((pid) => {
        let newArray = checks
        if (newArray.some(item => item === pid)) {
            newArray = newArray.filter(item => item !== pid)
        } else {
            newArray = [...checks, pid]
        }
        setChecks(newArray)
    }, [checks])

    const handleChooseAll = () => {
        if (checks.length === dataCurrent.cart.length) {
            setChecks([])
        } else {
            const newArray = checks

            for (let el of dataCurrent.cart) {
                const newArray = checks
                if (!checks.some(item => item === el.product._id)) {
                    newArray.push(el.product._id)
                }
            }

            setChecks([...newArray])
        }
    }

    const handleDeleteProduct = useCallback(async(data) => {
        const response = await apis.deleteProductCart(data)

        if (response.data.success) {
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
        }
    }, [])

    console.log(dataCurrent)

    return (
        <div>
            <h1 className='font-bold text-[24px] text-gray-600'>Giỏ hàng của bạn</h1>

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <button onClick={handleChooseAll} className='w-[20px] h-[20px] rounded-full border-2 relative flex items-center justify-center'>
                        {dataCurrent.cart.length === checks.length && <FaCircleCheck color='red' />}
                    </button>
                    {dataCurrent.cart.length === checks.length ? <span>Bỏ chọn tất cả</span> : <span>Chọn tất cả</span>}
                </div>

                {checks.length > 0 && 
                    <em className='hover:cursor-pointer text-[#9F9D9D] text-[14px] hover:text-gray-600 hover:underline'>Xoá sản phẩm đã chọn</em>
                }
            </div>

            <div className='mt-[10px] flex flex-col gap-2'>
                {dataCurrent.cart.map((item, index) => (
                    <Fragment key={item.product?.name}>
                        <ItemProductMyCart 
                            name={item?.product?.title} 
                            image={item?.product?.images?.[0]} 
                            price={item?.product.price?.price} 
                            discount={item?.product.price?.sale} 
                            quanlity={item?.quanlity}
                            color={item?.color} 
                            index={index}
                            onCheck={handleCheck}
                            pid={item.product?._id}
                            isChecked={checks.some(el => el === item.product._id)}
                            onDeleteProduct={handleDeleteProduct}
                        />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default withBaseCompanent(MyCart)