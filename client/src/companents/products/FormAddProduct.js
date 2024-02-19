import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import icons from '../../ultis/icons'
import { InputLogin, InputSelect } from '../../companents'
import { appSlice } from '../../store/appSlice'


const FormAddProduct = () => {

    const initData = {
        name: '',
        price: '',
        incentive: [],

    }
    const { categorys } = useSelector(state => state.app)
    const { IoClose } = icons
    const [ variants, setVariants ] = useState([1])
    const [ incentives, setIncentives ] = useState([1])
    const [ data, setData ] = useState(initData)
    const dispatch = useDispatch()

    const handleAddVariants = () => {
        variants.push(1)
        const newVariants = [...variants]
        setVariants(newVariants)
    }

    const handleRemoveVariants = () => {
        if (variants.length > 1) {
            variants.pop() 
            const newVariants = [...variants]
            setVariants(newVariants)
        }
    }

    const handleAddIncentives = () => {
        incentives.push(1)
        const newIncentives = [...incentives]
        setIncentives(newIncentives)
    }

    const handleRemoveIncentives = () => {
        if (incentives.length > 1) {
            incentives.pop() 
            const newIncentives = [...incentives]
            setIncentives(newIncentives)
        }
    }

    const handleHiddenForm = () => {
        dispatch(appSlice.actions.setShowChildren(false))
    }

    console.log(variants)

    return (
        <div className='w-[700px] max-h-[700px] overflow-y-auto bg-white rounded-md p-4 flex flex-col gap-[20px]'>
            <div className="flex justify-center relative w-full items-center">
                <h3 className='text-[20px] font-bold text-gray-700'>Thêm sản phẩm</h3>

                <button onClick={handleHiddenForm} className='absolute right-[5px]'><IoClose size={30} /></button>
            </div>

            <InputLogin value={data.name} setValue={setData} data={{label: 'Tên sản phẩm', placeholder: 'Nhập tên sản phẩm', name: 'name'}}/>

            <div className='flex items-center gap-[30px]'>
                <InputLogin value={data.price} setValue={setData} data={{label: 'Giá sản phẩm', placeholder: 'Nhập giá sản phẩm', name: 'price'}}/>
                <InputSelect data={{name: 'category', label: 'category', options: categorys?.data.map(item => ({value: item.category, text: item.category}))}}/>
            </div>

            <div className='flex gap-4 items-center'>
                <h2>Ưu đãi</h2>
                <button onClick={handleAddIncentives} className='py-1 px-2 bg-blue-500 rounded-md text-white text-[14px]'>Thêm</button>
                <button onClick={handleRemoveIncentives} className='py-1 px-2 bg-red-500 rounded-md text-white text-[14px]'>Xoá</button>
            </div>

            {incentives?.map((item, index) => (
                <div className='ml-4 flex flex-col gap-3'>
                    <InputLogin data={{label: `Ưu đãi ${index + 1}`, placeholder: 'Nhập ưu đãi'}}/>
                </div>
            ))}

            <div className='flex gap-4 items-center'>
                <h2>Phiên bản</h2>
                <button onClick={handleAddVariants} className='py-1 px-2 bg-blue-500 rounded-md text-white text-[14px]'>Thêm</button>
                <button onClick={handleRemoveVariants} className='py-1 px-2 bg-red-500 rounded-md text-white text-[14px]'>Xoá</button>
            </div>

            {variants?.map((item, index) => (
                <div className='ml-4 flex flex-col gap-3'>
                    <h2 className='text-[14px]'>{`Thông tin phiển bản thứ ${index + 1}`}</h2>
                    <InputLogin data={{label: 'Ảnh sản phẩm', placeholder: 'Nhập link ảnh sản phẩm'}}/>
                    <InputLogin data={{label: 'Màu sắc', placeholder: 'Nhập màu sắc'}} />
                    <InputLogin data={{label: 'Giá', placeholder: 'Nhập giá'}} />
                </div>
            ))}

        </div>
    )
}

export default FormAddProduct