import { memo } from 'react'

import { ItemVotePercent } from '../../companents'
import { renderStar } from '../../ultis/func'

const ResultVote = ({ dataDetaiProduct }) => {
    return (
        <div className='flex py-7 border-b-[1px]'>
            <div className='flex flex-3 flex-col justify-center items-center border-r-[1px] gap-1'>
                <p className='text-[24px] text-[#363636] font-bold'>{`${dataDetaiProduct?.totalRatings.rate}/${dataDetaiProduct?.totalRatings.totalUser}`}</p>

                <div className='flex items-center gap-2'>
                    {renderStar(Number(dataDetaiProduct?.totalRatings.rate)).map((item, index) => (<span key={index}>{item}</span>))}
                </div>

                <a href='#'>{`${dataDetaiProduct?.totalRatings.totalUser} đánh giá`}</a>
            </div>

            <div className='flex flex-7 justify-center'>
                <div className='flex flex-col-reverse gap-2 w-[700px]'>
                    {dataDetaiProduct?.totalRatings.percents?.map((item, index) => (
                        <div key={index}>
                            <ItemVotePercent 
                                amont={index + 1}
                                totalVote={item.count}
                                percentFill={item.percent}
                            />
                        </div> 
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(ResultVote)