import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import swal from 'sweetalert'

import icons from '../../ultis/icons'
import { InputLogin, InputSelect } from '../../companents'
import { appSlice } from '../../store/appSlice'
import { productSlice } from '../../store/productSlice'
import * as apis from '../../apis'

const FormAddProduct = () => {
    const initData = {
        title: '',
        price: '',
        category: '',
        brand: '',
        incentives: [],
        variants: [],
        information: [],
        highlights: [],
        version: [],
        images: [],
        quanlity: '',
    }

    const dispatch = useDispatch()
    const { categorys } = useSelector(state => state.app)
    const { render } = useSelector(state => state.product)
    const { IoClose, GoTrash } = icons

    const [ data, setData ] = useState(initData)
    const [ valueIncentive, setValueIncentive ] = useState({incentive: ''})
    const [ valueVariant, setValueVariant ] = useState({image: '', color: '', price: ''})
    const [ valueInformation, setValueInformation ] = useState({information: ''})
    const [ valueHighlight, setValueHighlight ] = useState({highlight: ''})
    const [ valueVersion, setValueVersion ] = useState({data: '', price: ''})
    const [ valueImage, setValueImage ] = useState({image: ''})
    const [ showDeleteImage, setShowDeleteImage ] = useState(null)

    const handleAddIncentive = () => {
        if (valueIncentive.incentive) {
            const newArray = data.incentives
            newArray.push(valueIncentive.incentive)
            setData(prev => ({...prev, incentives: newArray}))
            setValueIncentive(prev => ({incentive: ''}))
        } else {
            swal('Oops', 'Bạn chưa nhập ưu đãi sản phẩm', 'error')
        }
    }

    const handleDeleteIncetive = (index) => {
        const newArray = data.incentives
        newArray.splice(index, 1)
        setData(prev => ({...prev, incentives: newArray}))
    }

    const handleAddVariant = () => {
        if (valueVariant.image && valueVariant.color && valueVariant.price) {
            const newArray = data.variants
            newArray.push(valueVariant)
            setData(prev => ({...prev, variants: newArray}))
            setValueVariant(prev => ({image: '', color: '', price: ''}))
        } else {
            swal('Opps', 'Bạn chưa nhập đầy đủ thông tin phiên bản', 'error')
        }
    }

    const handleDeleteVariant = (index) => {
        const newArray = data.variants
        newArray.splice(index, 1)
        setData(prev => ({...prev, newArray}))
    }

    const handleAddInformation = () => {
        if (valueInformation.information) {
            const newArray = data.information
            newArray.push(valueInformation.information)
            setData(prev => ({...prev, information: newArray}))
            setValueInformation(prev => ({information: ''}))
        } else {
            swal('Opps', 'Bạn chưa nhập thông tin sản phẩm', 'error')
        }
    }

    const handleDeleteInformation = (index) => {
        const newArray = data.information
        newArray.splice(index, 1)
        setData(prev => ({...prev, information: newArray}))
    }

    const handleAddHighlight = () => {
        if (valueHighlight.highlight) {
            const newArray = data.highlights
            newArray.push(valueHighlight.highlight)
            setData(prev => ({...prev, highlights: newArray}))
            setValueHighlight(prev => ({highlight: ''}))
        } else {
            swal('Opps', 'Bạn chưa nhập thông tin sản phẩm', 'error')
        }
    }

    const handleDeleteHighlight = (index) => {
        const newArray = data.highlights
        newArray.splice(index, 1)
        setData(prev => ({...prev, highlights: newArray}))
    }

    const handleAddVersion = () => {
        if (valueVersion.data && valueVersion.price) {
            const newArray = data.version
            newArray.push(valueVersion)
            setData(prev => ({...prev, version: newArray}))
            setValueVersion(prev => ({data: '', price: ''}))
        } else {
            swal('Opps', 'Bạn chưa nhập đầy đủ thông tin dung lượng sản phẩm', 'error')
        }
    }

    const handleDeleteVersion = (index) => {
        const newArray = data.version
        newArray.splice(index, 1)
        setData(prev => ({...prev, version: newArray}))
    }

    const handleAddImage = () => {
        if (valueImage.image) {
            const newArray = data.images
            newArray.push(valueImage.image)
            setData(prev => ({...prev, images: newArray}))
            setValueImage(prev => ({image: ''}))
        } else {
            swal('Opps', 'Bạn chưa nhập link hình ảnh', 'error')
        }
    }

    const handleDeleteImage = (index) => {
        const newArray = data.images
        newArray.splice(index, 1)
        setData(prev => ({...prev, images: newArray}))
    }

    const handleCreateProduct = async() => {
        if (data.title 
            && data.price 
            && data.category 
            && data.brand 
            && data.incentives.length > 0 
            && data.variants.length > 0 
            && data.information.length > 0 
            && data.highlights.length > 0 
            && data.version.length > 0 
            && data.images.length > 0 
            && data.quanlity) {
                const dataPass = {...data, price: {price: data.price}, quanlity: Number(data.quanlity)}
                const response = await apis.createProduct(dataPass)
                swal(response.success ? 'Congratulations' : 'Opps', response.mes, response.success ? 'success' : 'error')
                if (response.success) {
                    dispatch(appSlice.actions.setChildren(null))
                    dispatch(productSlice.actions.setRender(!render))
                }
        } else {
            swal('Oops', 'Vui lòng nhập đầy đủ thông tin để thêm sản phẩm', 'error')
        }
    }

    const handleHiddenForm = () => {
        dispatch(appSlice.actions.setChildren(null))
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()} 
            className='w-[700px] max-h-[700px] overflow-y-auto bg-white rounded-md p-4 flex flex-col gap-[20px]'
        >
            <div className="flex justify-center relative w-full items-center">
                <h3 className='text-[20px] font-bold text-gray-700'>Thêm sản phẩm</h3>

                <button onClick={handleHiddenForm} className='absolute right-[5px]'><IoClose size={30} /></button>
            </div>

            <InputLogin value={data.title} setValue={setData} data={{label: 'Tên sản phẩm', placeholder: 'Nhập tên sản phẩm', name: 'title'}}/>

            <div className='flex items-center gap-[30px]'>
                <InputLogin value={data.price} setValue={setData} data={{label: 'Giá sản phẩm', placeholder: 'Nhập giá sản phẩm', name: 'price'}}/>
                <InputLogin value={data.brand} setValue={setData} data={{label: 'Hãng sẩn phẩm', placeholder: 'Nhập hãng sản phẩm', name: 'brand'}} />
                <InputLogin value={data.quanlity} setValue={setData} data={{label: 'Số lượng sản phẩm', placeholder: 'Nhập số lượng sản phẩm', name: 'quanlity'}}/>
            </div>

            <InputSelect value={data.category} setValue={setData} data={{name: 'category', label: 'category', options: categorys?.data?.map(item => ({value: item.category, text: item.category}))}} root/>

            <div className='flex flex-col gap-[20px]'>
                <div>
                    <h2 className='text-[14px] font-bold'>Ưu đãi</h2>
                    <ul className='ml-[20px]'>
                        {data?.incentives.map((item, index) => (
                            <li className='text-[14px] flex items-center gap-2' key={item}>
                                <p>{`${index + 1}. ${item}`}</p>
                                <button onClick={() => handleDeleteIncetive(index)} ><IoClose color="red" size={20} /></button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='ml-4 flex items-center gap-3'>
                    <InputLogin value={valueIncentive.incentive} setValue={setValueIncentive} data={{label: `Ưu đãi`, placeholder: 'Nhập ưu đãi', name: 'incentive'}}/>
                    <button onClick={handleAddIncentive} className='py-1 px-2 bg-blue-500 rounded-md text-white text-[14px]'>Thêm</button>
                </div>
            </div>

            <div>
                <h2 className='text-[14px] font-bold'>Phiên bản</h2>
                <ul className='ml-[20px] flex flex-col gap-2'>
                    {data?.variants.map((item, index) => (
                        <li className='text-[14px] flex items-center gap-3' key={item}>
                            <img className='w-[40px] h-[40px] object-cover rounded-md' alt='anh' src={item.image}></img>
                            <span>{`Màu sắc: ${item.color}`}</span>
                            <span>{`Giá: ${item.price}`}</span>
                            <button onClick={() => handleDeleteVariant(index)} ><IoClose color="red" size={20} /></button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='ml-4 flex flex-col gap-4'>
                <InputLogin value={valueVariant.image} setValue={setValueVariant} data={{label: 'Ảnh sản phẩm', placeholder: 'Nhập link ảnh sản phẩm', name: 'image'}}/>
                <InputLogin value={valueVariant.color} setValue={setValueVariant} data={{label: 'Màu sắc', placeholder: 'Nhập màu sắc', name: 'color'}} />
                <InputLogin value={valueVariant.price} setValue={setValueVariant} data={{label: 'Giá', placeholder: 'Nhập giá', name: 'price'}} />
                <div className='justify-end flex'>
                    <button onClick={handleAddVariant} className='py-1 px-2 w-[90px] bg-blue-500 rounded-md text-white text-[14px]'>Thêm</button>
                </div>
            </div>

            <div className='flex flex-col gap-[20px]'>
                <div>
                    <h2 className='text-[14px] font-bold'>Thông tin sản phẩm</h2>
                    <ul className='ml-[20px]'>
                        {data?.information.map((item, index) => (
                            <li className='text-[14px] flex items-center gap-2' key={item}>
                                <p>{`${index + 1}. ${item}`}</p>
                                <button onClick={() => handleDeleteInformation(index)} ><IoClose color="red" size={20} /></button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='ml-4 flex items-center gap-3'>
                    <InputLogin value={valueInformation.information} setValue={setValueInformation} data={{label: `Thông tin sản phẩm`, placeholder: 'Nhập thông tin sản phẩm', name: 'information'}}/>
                    <button onClick={handleAddInformation} className='py-1 px-2 bg-blue-500 rounded-md text-white text-[14px]'>Thêm</button>
                </div>
            </div>

            <div>
                <h2 className='text-[14px] font-bold'>Hình ảnh sản phẩm</h2>
                <div className='flex gap-2 flex-wrap items-center ml-[20px]'>
                    {data?.images.map((item, index) => (
                        <div 
                            onMouseEnter={() => setShowDeleteImage(index)}
                            onMouseLeave={() => setShowDeleteImage(null)}
                            className='w-[50px] h-[50px] relative rounded-md overflow-hidden'
                        >
                            <img className='object-cover w-full h-full' alt='anh' src={item}></img>
                            {showDeleteImage === index && 
                                <div onClick={() => handleDeleteImage(index)} className='w-full h-full absolute flex items-center cursor-pointer justify-center inset-0 bg-overlay'>
                                    <GoTrash color="white" />
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div className='ml-4 flex items-center gap-3'>
                <InputLogin value={valueImage.image} setValue={setValueImage} data={{label: `Hình ảnh`, placeholder: 'Nhập link hình ảnh sản phẩm', name: 'image'}}/>
                <button onClick={handleAddImage} className='py-1 px-2 bg-blue-500 rounded-md text-white text-[14px]'>Thêm</button>
            </div>

            <div className='flex flex-col gap-[20px]'>
                <div>
                    <h2 className='text-[14px] font-bold'>Thông tin nổi bật của sản phẩm</h2>
                    <ul className='ml-[20px]'>
                        {data?.highlights.map((item, index) => (
                            <li className='text-[14px] flex items-center gap-2' key={item}>
                                <p>{`${index + 1}. ${item}`}</p>
                                <button onClick={() => handleDeleteHighlight(index)} ><IoClose color="red" size={20} /></button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='ml-4 flex items-center gap-3'>
                    <InputLogin value={valueHighlight.highlight} setValue={setValueHighlight} data={{label: `Thông tin nổi bật`, placeholder: 'Nhập thông tin nổi bật', name: 'highlight'}}/>
                    <button onClick={handleAddHighlight} className='py-1 px-2 bg-blue-500 rounded-md text-white text-[14px]'>Thêm</button>
                </div>
            </div>

            <div>
                <h2 className='text-[14px] font-bold'>Dung lượng</h2>
                <ul className='ml-[20px]'>
                    {data?.version.map((item, index) => (
                        <li className='text-[14px] flex items-center gap-3' key={item.data}>
                            <p>{`${index + 1}. ${item.data}`}</p>
                            <span>{`Giá: ${item.price}`}</span>
                            <button onClick={() => handleDeleteVersion(index)} ><IoClose color="red" size={20} /></button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='ml-4 flex flex-col gap-4'>
                <InputLogin value={valueVersion.data} setValue={setValueVersion} data={{label: 'Dung lương', placeholder: 'Nhập dung lượng', name: 'data'}}/>
                <InputLogin value={valueVersion.price} setValue={setValueVersion} data={{label: 'Giá', placeholder: 'Nhập giá', name: 'price'}} />
                <div className='justify-end flex'>
                    <button onClick={handleAddVersion} className='py-1 px-2 w-[90px] bg-blue-500 rounded-md text-white text-[14px]'>Thêm</button>
                </div>
            </div>

            <button onClick={handleCreateProduct} className='py-2 px-4 bg-main rounded-md text-white font-bold'>Tạo sản phẩm</button>
        </div>
    )
}

export default FormAddProduct