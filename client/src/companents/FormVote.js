import { memo, useState } from 'react'
import swal from 'sweetalert'

import icons from '../ultis/icons'
import iconvote from '../assets/imgs/iconvote.png'
import { starVote } from '../ultis/contants'
import * as apis from '../apis'

const FormVote = ({name, setShowForm, pid, setLoadComment}) => {
    const [ star, setStar ] = useState(5)
    const [ starHover, setStarHover ] = useState(0)
    const { IoClose, FaStar } = icons
    const [ value, setValue ] = useState('')
    const passData = {
        pid,
        star,
        comment: value,
        updatedAt: Date.now(),
    }

    const handleSubmitForm = async() => {
        if (passData.comment.length < 10) {
            swal('Opps', 'Bình luật quá ngắn vui lòng nhập lại', 'error')
        } else {
            const response = await apis.ratings(passData)
            swal(response.success ? 'Congratulation' : 'Opps', response.mes, response.success ? 'success' : 'error')
            if (response.success) {
                setShowForm(false)
                setLoadComment(prev => !prev)
            }
        }
    }

    return (
        <div className='p-3'>
            <div className='flex justify-between'>
                <h1 className='text-[#363636] text-[20px] font-bold'>Đánh giá & nhận xét</h1>

                <span onClick={() => setShowForm(false)} className='cursor-pointer'><IoClose size='30'/></span>
            </div>

            <div className='flex mt-2'>
                <img src={iconvote} atl='iconvote' className='w-[100px] h-[100px] object-cover'></img>

                <p className='text-[20px] text-[#4A4A4A] font-semibold mt-4'>{name}</p>
            </div>

            <div className='mt-5 border-b-[1px]'>
                <p className='text-[#111111] text-[16px] font-semibold'>Đánh giá chung</p>

                <div className='flex mt-5 pb-3'>
                    {starVote.map(item => (
                        <div 
                            onClick={() => setStar(item.id)}
                            onMouseEnter={() => setStarHover(item.id)}
                            onMouseLeave={() => setStarHover(0)}
                            key={item.id} 
                            className='flex-1 flex flex-col items-center gap-1 cursor-pointer'
                        >
                            <FaStar size={23} color={`${starHover ? (item.id <= starHover ? '#FFBF00' : '#C6CCD3') : (item.id <= star ? '#FFBF00' : '#C6CCD3')}`}/>
                            <span className='text-[13px] text-[#4A4A4A]'>{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <textarea onChange={(e) => setValue(e.target.value)} className='h-[100px] p-2 w-full mt-4 border rounded-md outline-blue-500' type='text' placeholder='Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)'/>

            <button 
                onClick={handleSubmitForm}
                className='text-[16px] text-white font-bold bg-main w-full py-2 rounded-md mt-2'
            >
                GỬI ĐÁNH GIÁ
            </button>
        </div>
    )
}

export default memo(FormVote)