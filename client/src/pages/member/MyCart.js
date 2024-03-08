import { useSelector } from 'react-redux'
import { useState, useCallback, Fragment, useEffect } from 'react'

import { ItemProductMyCart } from '../../companents'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'
import icons from '../../ultis/icons'
import * as apis from '../../apis'
import { userSlice } from '../../store/userSlice'
import path from '../../ultis/path'

const MyCart = ({ dispatch, navigate}) => {
    const { dataCurrent } = useSelector(state => state.user)
    const [ checks, setChecks ] = useState([])
    const { FaCircleCheck } = icons
    const [ total, setTotal] = useState(0)

    const handleCheck = useCallback((id) => {
        let newArray = checks 
        if (newArray.some(item => item === id)) {
            newArray = newArray.filter(item => item !== id)
        } else {
            newArray = [...checks, id]
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
                if (!checks.some(item => item === el._id)) {
                    newArray.push(el._id)
                }
            }

            setChecks([...newArray])
        }
    }

    const handleDeleteProduct = useCallback(async(data) => {
        const response = await apis.deleteProductCart(data)

        if (response.data.success) {
            setChecks(prev => prev.filter(item => item !== data.id))
            dispatch(userSlice.actions.setDataUserCurrent(response.data.data))
        }
    }, [dispatch])

    useEffect(() => {
        let newArray = dataCurrent.cart.filter(item => checks.some(el => el === item._id))
        newArray = newArray.map(item => {
            if (item.product.price.sale) {
                return {price: Number(item.product.price.sale?.slice(0, item.product.price.sale.length - 1).split('.').join('')), quanlity: item.quanlity}
            } else {
                return {price: Number(item.product.price.price?.slice(0, item.product.price.price.length - 1).split('.').join('')), quanlity: item.quanlity}
            }
        })
        const sum = newArray.reduce((rs, el) => (rs + el.price * el.quanlity), 0)
        setTotal(sum)
    }, [checks, dataCurrent])

    const handleCheckout = () => {
        if (checks.length > 0) {
            let newArray = dataCurrent.cart.filter(item => checks.some(el => el === item._id))
            dispatch(userSlice.actions.setDataCartCheckout(newArray))
            navigate(`/${path.CHECKOUT}`)
        }
    }

    return (
        <div className='relative'>
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

            <div className='mt-[10px] flex flex-col gap-2 w-[600px]'>
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
                            isChecked={checks.some(el => el === item._id)}
                            onDeleteProduct={handleDeleteProduct}
                            path={`/${path.DETAIL_PRODUCT}/${item.product._id}`}
                            id={item._id}
                        />
                    </Fragment>
                ))}
            </div>

            <div className='h-[100px]'></div>

            <div className='w-[600px] px-2 pt-2 pb-4 flex bg-white items-center rounded-md border-[1px] justify-between fixed bottom-0'>
                <div className='flex flex-col'>
                    <p className='text-[14px] font-medium'>Tạm tính</p>
                    <p className='text-main text-[16px] font-semibold'>{`${total.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}`}</p>
                </div>

                <button 
                    onClick={handleCheckout}
                    to={`/${path.CHECKOUT}`}
                    className='py-2 px-4 text-white bg-main text-[16px] rounded-md'
                >
                    {`Mua ngay (${checks.length})`}
                </button>
            </div>
        </div>
    )
}

export default withBaseCompanent(MyCart)