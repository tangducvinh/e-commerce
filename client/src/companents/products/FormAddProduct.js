import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import icons from '../../ultis/icons'
import { InputLogin, InputSelect } from '../../companents'
import { appSlice } from '../../store/appSlice'

const FormAddProduct = () => {

    const initData = {
        name: '',
        price: '',
        category: '',
        brand: '',
        incentives: [],
        variants: [],
        information: [],
        highlights: [],
        version: [],
    }

    const dispatch = useDispatch()
    const { categorys } = useSelector(state => state.app)
    const { IoClose } = icons

    const [ data, setData ] = useState(initData)
    const [ valueIncentive, setValueIncentive ] = useState({incentive: ''})
    const [ valueVariant, setValueVariant ] = useState({image: '', color: '', price: ''})
    const [ valueInformation, setValueInformation ] = useState({information: ''})
    const [ valueHighlight, setValueHighlight ] = useState({highlight: ''})
    const [ valueVersion, setValueVersion ] = useState({data: '', price: ''})

    const handleAddIncentive = () => {
        const newArray = data.incentives
        newArray.push(valueIncentive.incentive)
        setData(prev => ({...prev, incentives: newArray}))
        setValueIncentive(prev => ({incentive: ''}))
    }

    const handleDeleteIncetive = (index) => {
        const newArray = data.incentives
        newArray.splice(index, 1)
        setData(prev => ({...prev, incentives: newArray}))
    }

    const handleAddVariant = () => {
        const newArray = data.variants
        newArray.push(valueVariant)
        setData(prev => ({...prev, variants: newArray}))
        setValueVariant(prev => ({image: '', color: '', price: ''}))
    }

    const handleDeleteVariant = (index) => {
        const newArray = data.variants
        newArray.splice(index, 1)
        setData(prev => ({...prev, newArray}))
    }

    const handleAddInformation = () => {
        const newArray = data.information
        newArray.push(valueInformation.information)
        setData(prev => ({...prev, information: newArray}))
        setValueInformation(prev => ({information: ''}))
    }

    const handleDeleteInformation = (index) => {
        const newArray = data.information
        newArray.splice(index, 1)
        setData(prev => ({...prev, information: newArray}))
    }

    const handleAddHighlight = () => {
        const newArray = data.highlights
        newArray.push(valueHighlight.highlight)
        setData(prev => ({...prev, highlights: newArray}))
        setValueHighlight(prev => ({highlight: ''}))
    }

    const handleDeleteHighlight = (index) => {
        const newArray = data.highlights
        newArray.splice(index, 1)
        setData(prev => ({...prev, highlights: newArray}))
    }

    const handleAddVersion = () => {
        const newArray = data.version
        newArray.push(valueVersion)
        setData(prev => ({...prev, version: newArray}))
        setValueVersion(prev => ({data: '', price: ''}))
    }

    const handleDeleteVersion = (index) => {
        const newArray = data.version
        newArray.splice(index, 1)
        setData(prev => ({...prev, version: newArray}))
    }


    const handleHiddenForm = () => {
        dispatch(appSlice.actions.setChildren(null))
    }

    return (
        <div className='w-[700px] max-h-[700px] overflow-y-auto bg-white rounded-md p-4 flex flex-col gap-[20px]'>
            <div className="flex justify-center relative w-full items-center">
                <h3 className='text-[20px] font-bold text-gray-700'>Thêm sản phẩm</h3>

                <button onClick={handleHiddenForm} className='absolute right-[5px]'><IoClose size={30} /></button>
            </div>

            <InputLogin value={data.name} setValue={setData} data={{label: 'Tên sản phẩm', placeholder: 'Nhập tên sản phẩm', name: 'name'}}/>

            <div className='flex items-center gap-[30px]'>
                <InputLogin value={data.price} setValue={setData} data={{label: 'Giá sản phẩm', placeholder: 'Nhập giá sản phẩm', name: 'price'}}/>
                <InputLogin value={data.brand} setValue={setData} data={{label: 'Hãng sẩn phẩm', placeholder: 'Nhập hãng sản phẩm', name: 'brand'}} />
                <InputSelect value={data.category} setValue={setData} data={{name: 'category', label: 'category', options: categorys?.data.map(item => ({value: item.category, text: item.category}))}} root/>
            </div>

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
                            <img className='w-[40px] h-[40px] object-cover rounded-md' src={item.image}></img>
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

        </div>
    )
}

export default FormAddProduct