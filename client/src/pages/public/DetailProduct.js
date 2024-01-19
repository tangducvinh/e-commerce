import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallBack } from 'react'

import * as apis from '../../apis'
import icons from '../../ultis/icons'
import { SlickProduct, ItemVotePercent, ItemUserComment, FormVote } from '../../companents'
import { renderStar } from '../../ultis/func'
import { filterStar } from '../../ultis/contants'
import imageEmpty from '../../assets/imgs/imageEmpty.png'
import { FaLessThanEqual } from 'react-icons/fa6'

const DetailProduct = () => {
    const { pid } = useParams()
    const [ dataDetaiProduct, setDataDetaiProduct ] = useState(null)
    const { FaStar, HiGift, FaCartPlus, FaCheck } = icons
    const [ number, setNumber ] = useState(0)
    const [ version, setVersion ] = useState(0)
    const [ variant, setVariant ] = useState(0)
    const [ dataProducts, setDataProducts ] = useState(null)
    const [ showForm, setShowForm ] = useState(false)
    const [ loadComment, setLoadComment ] = useState(false)
    const [ filterStarComment, setFilterStarComment ] = useState(0)

    const renderStarVisible = [
        <FaStar color='#f59e0b'/>, 
        <FaStar color='#f59e0b'/>, 
        <FaStar color='#f59e0b'/>, 
        <FaStar color='#f59e0b'/>, 
        <FaStar color='#f59e0b'/>
    ]
    
    const fecthDetailProduct = async(pid) => {
        const response = await apis.getDetailProduct(pid)
        setDataDetaiProduct(response)
    }
    const fecthProducts = async(category) => {
        const response = await apis.getProducts(category)
        setDataProducts(response)
    }
    useEffect(() => {
        fecthDetailProduct(pid)
        fecthProducts(dataDetaiProduct?.category)
    }, [pid, dataDetaiProduct?.category, loadComment])

    return (
        <div className='flex justify-center relative'>

            {showForm && 
                <div 
                    className='absolute right-0 top-[-104px] left-0 bottom-0 bg-overlay z-10'
                >
                    <div className='flex justify-center w-srceen h-screen items-center'>
                        <div className='w-[600px] bg-white rounded-lg fixed animate-slice-form'>
                            <FormVote setLoadComment={setLoadComment} name={dataDetaiProduct?.title} setShowForm={setShowForm} pid={pid}/>
                        </div>    
                    </div>    
                </div>
            }

            <div className='flex w-[1220px] flex-col'>
                <div className='w-full flex items-center h-[60px] gap-2 border-b-2'>
                    <h3 className='font-bold text=[#0A263C] text-[18px]'>{dataDetaiProduct?.title}</h3>
                    <div className='flex items-center'>
                        {dataDetaiProduct?.star === 5 && renderStarVisible.map((item, index) => <span key={index}>{item}</span>)}
                    </div>
                </div>

                <div className='flex mt-5 gap-5 mb-7'>
                    <div className='flex-6 overflow-hidden'>
                        <div className='flex justify-center w-full border rounded-xl overflow-hidden h-[400px]'>
                            <img src={dataDetaiProduct?.images[number]} className='object-cover' alt='product'></img>
                        </div>

                        <div className='h-[52px] flex scroll-smooth focus:scroll-auto mt-2 cursor-pointer'>
                            {dataDetaiProduct?.images.map((item, index) => (
                                <div
                                    key={item}
                                    onClick={() => setNumber(index)} 
                                    className='mr-2 flex flex-shrink-0 justify-center w-[50px] h-[50px] border rounded-lg'
                                >
                                    <img src={item} className='object-contain' alt='banner'></img>
                                </div>
                            ))}
                        </div>

                        <div className='mt-5 border rounded-xl p-2'>
                            <h4 className='text-[#444444] text-[16px] font-bold'>Thông tin sản phẩm</h4>

                            {dataDetaiProduct?.information.map((item, index) => (
                                <p className='text-[#4A4A4A] text-[14px] ml-2 my-1' key={index}>{`${index + 1}. ${item}`}</p>
                            ))}
                        </div>

                        {dataDetaiProduct?.highlights.length !== 0 && 
                            <div className='w-full mt-5 rounded-xl bg-[#f2f2f2] p-2'>
                                <h2 className='text-[18px] text-[#D70018] w-full text-center font-bold'>ĐẶC ĐIỂM NỔI BẬT</h2>
                                <ul className='list-disc'>
                                    {dataDetaiProduct?.highlights.map((item, index) => (
                                        <li className='text-[14px] py-1 text-[#4A4A4A]' key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>

                    <div className='flex-4'>
                        {dataDetaiProduct?.version.length === 0 && <div className='flex gap-2 items-center h-[30px]'>
                            <span className='text-[20px] font-bold text-[#D70018]'>{dataDetaiProduct?.price.sale}</span>
                            <p className='text-[14px] line-through'>{dataDetaiProduct?.price?.price}</p>
                        </div>}

                        <div className='flex ml-[-8px] flex-wrap'>
                            {dataDetaiProduct?.version.map((item, index) => (
                                <div 
                                    onClick={() => setVersion(index)}
                                    className={`flex flex-col ml-2 mb-2 items-center border overflow-hidden rounded-lg py-2 cursor-pointer w-three relative ${index === version ? 'border-main' : undefined}` }
                                >
                                    <strong className='text-[12px] text-[#444444]'>{item.data}</strong>
                                    <span className='text-[12px] text-[#444444]'>{item.price}</span>
                                    {index === version && 
                                        <div className='absolute w-5 h-5 bg-main top-0 left-0 rounded-br-xl flex items-center justify-center'>
                                            <FaCheck color='white' size={12}/>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>

                        <div className='mt-2'>
                            {dataDetaiProduct?.variants.length !== 0 && <p className='text-[14px] text-[#444444] font-bold mb-2'>Màu sắc</p>}
                            <div className='flex ml-[-8px] flex-wrap'>
                                {dataDetaiProduct?.variants.map((item, index) => (
                                    <div 
                                        onClick={() => setVariant(index)}
                                        key={index}
                                        className={`flex gap-2 ml-2 w-three mb-2 rounded-lg border items-center justify-center py-2 cursor-pointer relative ${variant === index ? 'border-main' : undefined}`}>
                                        <img className='w-[30px] h-[30px] object-cover' src={item.image} alt='list product'></img>

                                        <div className='flex flex-col text-[12px] text-[#444444]'>
                                            <strong>{item.color}</strong>
                                        </div>

                                        {variant === index && 
                                            <div className='absolute w-5 h-5 bg-main top-0 left-0 rounded-br-xl flex items-center justify-center'>
                                                <FaCheck color='white' size={12}/>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>

                        {dataDetaiProduct?.incentives.length !== 0 && dataDetaiProduct?.incentives !== null && 
                            <div className='rounded-xl border mt-2 overflow-hidden'>
                                <div className='flex gap-2 items-center bg-[#fee2e2] p-2 mb-2'>
                                    <HiGift color="red" size={27}/>
                                    <h2 className='text-[16px] text-[#D70018] font-bold'>Khuyến mãi</h2>
                                </div>
                                {dataDetaiProduct?.incentives.map((item, index) => (
                                    <div className='flex gap-1 p-2'>
                                        <span className='bg-main w-4 h-4 flex flex-shrink-0 justify-center items-center text-[10px] rounded-full font-bold text-white'>{index + 1}</span>
                                        <p className='text-[14px] text-[#0A0A0A]'>{item?.split('<span>')[0]}</p>
                                    </div>
                                ))}
                            </div>
                        }

                        <div className='mt-4'>
                            <div className='flex gap-3'>
                                <button className='flex-8 bg-main rounded-xl text-white font-bold h-[60px]'>MUA NGAY</button>
                                <div className='flex-2 rounded-xl border-2 border-main flex justify-center items-center flex-col cursor-pointer'>
                                    <FaCartPlus size={25} color='#E40404'/>
                                    <span className='text-[9px] text-[#E40404]'>Thêm giỏ hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SlickProduct data={dataProducts} title={'SẢN PHẨM TƯƠNG TỰ'}/>

                <div className='mt-4 rounded-xl shadow-md p-3'>
                    <h2 className='text-[16px] text-[#363636] font-bold'>{`Đánh giá & nhận xét ${dataDetaiProduct?.title}`}</h2>

                    {dataDetaiProduct?.ratings?.length !== 0 &&
                        <div className='flex py-7 border-b-[1px]'>
                            <div className='flex flex-3 flex-col justify-center items-center border-r-[1px] gap-1'>
                                <p className='text-[24px] text-[#363636] font-bold'>{`${dataDetaiProduct?.totalRatings.rate}/${dataDetaiProduct?.totalRatings.totalUser}`}</p>

                                <div className='flex items-center gap-2'>
                                    {renderStar(Number(dataDetaiProduct?.totalRatings.rate)).map(item => item)}
                                </div>

                                <a href='#'>{`${dataDetaiProduct?.totalRatings.totalUser} đánh giá`}</a>
                            </div>

                            <div className='flex flex-7 justify-center'>
                                <div className='flex flex-col-reverse gap-2 w-[700px]'>
                                    {dataDetaiProduct?.totalRatings.percents?.map((item, index) => (
                                        <ItemVotePercent 
                                            amont={index + 1}
                                            totalVote={item.count}
                                            percentFill={item.percent}
                                        /> 
                                    ))}
                                </div>
                            </div>
                        </div>
                    }

                    <p className='text-[16px] text-[#4A4A4A] text-center mt-5'>Bạn đánh giá sao về sản phẩm này?</p>
                    <div className='text-center mt-7 pb-8 border-b-[1px]'>
                        <button 
                            onClick={() => setShowForm(true)}
                            className='text-[16px] text-white bg-main text-center p-2 px-6 rounded-md'>Đánh giá ngay
                        </button>
                    </div>

                    {dataDetaiProduct?.ratings.length !== 0 &&
                        <div>
                            <h2 className='text-[18px] text-[#363636] font-semibold mt-5'>Lọc theo</h2>

                            <div className='mt-2'>
                                <div 
                                    onClick={() => setFilterStarComment(0)}
                                    className={`text-[14px] px-3 py-1 inline-block rounded-3xl border-[1px] cursor-pointer ${filterStarComment === 0 ? 'bg-main text-white' : 'text-[#637381]'}`}
                                >
                                    Tất cả
                                </div>             
                            </div>    

                            <div className='flex gap-2 mt-2'>
                                {filterStar.map(item => (
                                    <div 
                                        onClick={() => setFilterStarComment(item.amont)}
                                        className={`flex gap-1 border px-3 py-1 rounded-3xl items-center cursor-pointer ${item.amont === filterStarComment ? 'bg-main text-white' : 'text-[#637381]'}`}
                                    >
                                        <span className='text-[15px] mt-1'>{item.amont}</span>
                                        {item.star}
                                    </div>    
                                ))}
                            </div>    

                            <div className='mt-3 pb-3'>
                                {filterStarComment === 0 
                                    ? dataDetaiProduct?.ratings.map((item, index) => (
                                        <div className='border-b-[1px] py-3 pb-3' key={index}>
                                            <ItemUserComment userId={item.postedBy} comment={item.comment} star={item.star}/>
                                        </div>
                                    ))
                                    : dataDetaiProduct?.ratings.filter(item => item.star === filterStarComment).length === 0 
                                        ? <div className='flex justify-center mt-8 mb-8'>
                                            <div className='flex flex-col items-center'>
                                                <img src={imageEmpty}></img>
                                                <p className='text-[#4A4A4A] text-[14px] mt-4'>Bạn đánh giá sao về sản phẩm này</p>
                                            </div>
                                        </div>
                                        : dataDetaiProduct?.ratings.filter(item => item.star === filterStarComment).map((item, index) => (
                                            <div className='border-b-[1px] py-3 pb-3' key={index}>
                                                <ItemUserComment userId={item.postedBy} comment={item.comment} star={item.star}/>
                                            </div> 
                                        ))
                                }
                            </div>
                        </div>
                    } 
                </div>

                <div className='h-[50px]'></div>
            </div> 
        </div>
    )
}

export default DetailProduct