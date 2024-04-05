import { useState, memo } from 'react'

import { ItemUserComment } from '../../companents'
import { filterStar } from '../../ultis/contants'
import imageEmpty from '../../assets/imgs/imageEmpty.png'

const CommentVote = ({ dataDetaiProduct }) => {
    const [ filterStarComment, setFilterStarComment ] = useState(0)

    return (
        <div>
            <h2 className='text-[18px] text-[#363636] font-semibold mt-5'>Lọc theo</h2>

            <div className='mt-2'>
                <div 
                    onClick={() => setFilterStarComment(0)}
                    className={`text-[14px] px-3 py-1 inline-block rounded-3xl border-[1px] border-gray-400 cursor-pointer ${filterStarComment === 0 ? 'bg-main text-white' : 'text-[#637381]'}`}
                >
                    Tất cả
                </div>             
            </div>    

            <div className='flex gap-2 mt-2'>
                {filterStar.map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => setFilterStarComment(item.amont)}
                        className={`flex gap-1 border-[1px] border-gray-400 px-3 py-1 rounded-3xl items-center cursor-pointer ${item.amont === filterStarComment ? 'bg-main text-white' : 'text-[#637381]'}`}
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
                            <ItemUserComment comment={item.comment} userName={item.postedBy?.name} updatedAt={item.updatedAt} star={item.star}/>
                        </div>
                    ))
                    : dataDetaiProduct?.ratings.filter(item => item.star === filterStarComment).length === 0 
                        ? <div className='flex justify-center mt-8 mb-8'>
                            <div className='flex flex-col items-center'>
                                <img src={imageEmpty} alt='profile'></img>
                                <p className='text-[#4A4A4A] text-[14px] mt-4'>Hiện chưa có đánh giá nào thoả mãn</p>
                            </div>
                        </div>
                        : dataDetaiProduct?.ratings.filter(item => item.star === filterStarComment).map((item, index) => (
                            <div className='border-b-[1px] py-3 pb-3' key={index}>
                                <ItemUserComment userName={item.postedBy?.name} userId={item.postedBy} comment={item.comment} star={item.star}/>
                            </div> 
                        ))
                }
            </div>
        </div>
    )
}

export default memo(CommentVote)