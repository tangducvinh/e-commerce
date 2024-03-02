import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { ItemProductCheckout, InputLogin } from '../../companents'
import icons from '../../ultis/icons'
import { Link } from 'react-router-dom'
import path from '../../ultis/path'

const Checkout = () => {
    const { GoArrowLeft, IoChevronDownOutline, IoChevronUpOutline } = icons
    const { dataCartCheckout, dataCurrent } = useSelector(state => state.user)
    const [ show, setShow ] = useState(1)
    const [ value, setValue ] = useState({name: dataCurrent.name, mobile: dataCurrent.mobile, email: dataCurrent.email})
    const [ valueAddress, setValueAddress ] = useState({city: '', county: '', ward: '', street: '', note: ''})
    const [ total, setTotal ] = useState(0)

    useEffect(() => {
        const newArray = dataCartCheckout.map(item => {
            if (item.product.price.sale) {
                return {price: Number(item.product.price.sale.slice(0, -1).replaceAll('.', '')), quantity: item.quanlity}
            } else {
                return {price: Number(item.product.price.price.slice(0, -1).replaceAll('.', '')), quantity: item.quanlity}
            }
        })
        const sum = newArray.reduce((rs, current) => rs + current.price * current.quantity, 0)
        setTotal(sum)
    }, [dataCartCheckout])

    return (
        <div className='flex justify-center'>
            <div className='w-[600px] relative mt-[20px] flex flex-col gap-[20px]'>
                <div className='relative flex items-center justify-center border-b-[1px] pb-2'>
                    <h1 className="text-[18px] font-bold text-[#323232]">Thông tin</h1>
                    <Link to={`/${path.MEMBER}/${path.MYCART}`} className='absolute left-0 border-gray'><GoArrowLeft size='30px'/></Link>
                </div>

                <div className='p-4 rounded-md border-[1px] flex flex-col gap-2'>
                    {dataCartCheckout.filter((el, index) => index < show).map((item, index) => (
                        <ItemProductCheckout 
                            image={item.product.images[0]}
                            name={item.product.title}
                            color={item.product.color}
                            price={item.product.price.price}
                            sale={item.product.price.sale}
                            quantity={item.quanlity}
                            style={index === show - 1 ? '' : 'border-b-[1px]'}
                        />
                    ))}

                    {dataCartCheckout.length > 1 && 
                        <div className='flex justify-center mt-1'>
                            {show === 1 ? 
                                <button  
                                    onClick={() => setShow(dataCartCheckout.length)}
                                    className='flex items-center gap-1 underline text-[#637381] text-[15px]'
                                >
                                    {`và ${dataCartCheckout.length - 1} sản phẩm khác`}<IoChevronDownOutline size='15px' />
                                </button>
                                :
                                <button 
                                    onClick={() => setShow(1)}
                                    className='flex items-center gap-1 underline text-[#637381] text-[15px]'
                                >
                                    Thu gọn<IoChevronUpOutline size='15px' />
                                </button>    
                            }
                        </div>
                    }
                </div>

                <div>
                    <h1 className='text-[16px]'>THÔNG TIN KHÁCH HÀNG</h1>
                    <div className='rounded-md border-[1px] p-4 py-10 flex flex-col gap-[30px] mt-2'>
                        <div className='flex gap-[20px] items-center'>
                            <InputLogin 
                                value={value.name} 
                                setValue={setValue} 
                                data={{label: 'HỌ VÀ TÊN', name: 'name', placeholder: 'Nhập họ và tên: '}} 
                                style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                            />
                            <InputLogin 
                                value={value.mobile} 
                                setValue={setValue} 
                                data={{label: 'SỐ ĐIỆN THOẠI', name: 'mobile', placeholder: 'Nhập số điện thoại: '}} 
                                style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                            />
                        </div>
                        <InputLogin 
                            value={value.email} 
                            setValue={setValue} 
                            data={{label: 'EMAIL', placeholder: 'Nhập email: ', name: 'email', description:'(*) Hóa đơn VAT sẽ được gửi qua email này'}} 
                            style={{color: 'border-blue-600', label: 'text-blue-600'}}
                        />
                    </div>
                </div>

                <div>
                    <h1 className='text-[16px]'>THÔNG TIN NHẬN HÀNG</h1>
                    <div className='rounded-md border-[1px] p-4 py-10 flex flex-col gap-[30px] mt-2'>
                        <div className='flex gap-[20px] items-center'>
                            <InputLogin 
                                value={value.city} 
                                setValue={setValue} 
                                data={{label: 'TỈNH / THÀNH PHỐ', name: 'city', placeholder: 'Nhập tỉnh/thành phố : '}} 
                                style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                            />
                            <InputLogin 
                                value={value.county} 
                                setValue={setValue} 
                                data={{label: 'QUẬN / HUYỆN', name: 'county', placeholder: 'Nhập quận/huyện: '}} 
                                style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                            />
                        </div>
                        <div className='flex gap-[20px] items-center'>
                            <InputLogin 
                                value={value.ward} 
                                setValue={setValue} 
                                data={{label: 'PHƯỜNG / XÃ', name: 'ward', placeholder: 'Nhập phường/xã: '}} 
                                style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                            />
                            <InputLogin 
                                value={value.street} 
                                setValue={setValue} 
                                data={{label: 'ĐỊA CHỈ', name: 'street', placeholder: 'Số nhà, tên đường: '}} 
                                style={{css: 'w-[50%]', color: 'border-blue-600', label: 'text-blue-600'}}
                            />
                        </div>
                        <InputLogin 
                            value={value.note} 
                            setValue={setValue} 
                            data={{label: 'GHI CHÚ', placeholder: 'Ghi chú khác nếu có: ', name: 'note'}} 
                            style={{color: 'border-blue-600', label: 'text-blue-600'}}
                        />
                    </div>
                    <p className='text-[12px] text-[#637381] mt-2'>
                        <strong>Mẹo </strong>
                        <span>Bạn có thể cài đặt Sổ địa chỉ tại</span>
                        <strong> thông tin cá nhân </strong>
                        <span>để đặt hàng nhanh hơn.</span>
                    </p>
                </div>

                <div className='h-[100px]'></div>

                <div className='pb-5 fixed bottom-0 w-[600px] bg-white rounded-md border-[1px] px-2 py-3 shadow-md'>
                    <div className='flex items-center justify-between'>
                        <p className='text-[16px] font-bold'>Tổng tiền tạm thời: </p>
                        <spam className='text-main text-[16px] font-bold'>{total.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}</spam>
                    </div>
                    <button className='bg-main rounded-md w-full py-2 text-white mt-2'>Tiếp tục</button>
                </div>

            </div>
        </div>
    )
}

export default Checkout