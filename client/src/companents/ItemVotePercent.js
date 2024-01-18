
import icons from '../ultis/icons'

const ItemVotePercent = ({amont, percentFill, totalVote}) => {
    const { FaStar } = icons

    return (
        <div className="flex items-center">
            <div className='flex gap-1 items-center'>
                <span className='text-[#4A4A4A] mt-1 text-[14px] font-bold'>{amont}</span>
                <FaStar color='#FFBF00'/>
            </div>
            <div className='flex-1 h-[10px] bg-[#EDEDED] ml-3 mr-3 rounded-full overflow-hidden'>
                <div className={`h-[10px] bg-main rounded-full w-[${percentFill.toString()}%]`}></div>
            </div>
            <p className='text-[#4A4A4A] text-[14px]'>{`${totalVote} đánh giá`}</p>
        </div>
    )
}

export default ItemVotePercent