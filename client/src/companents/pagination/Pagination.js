import { useSearchParams, useNavigate, useParams, createSearchParams, useLocation } from 'react-router-dom'
import { useState, useEffect, memo } from 'react'

import usePagination from '../../hooks/usePagination'
import icons from '../../ultis/icons'

const Pagination = ({ totalProductCount }) => {
    const [ params ] = useSearchParams()
    const navigate = useNavigate()
    const { FaAngleLeft, FaAngleRight } = icons
    const [ page, setPage ] = useState(1)
    const location = useLocation()

    const handleChoosePage = (el) => {
        if (Number(el)) {
            const getParams = Object.fromEntries([...params])
            navigate({
                pathname: location.pathname,
                search: createSearchParams({
                    ...getParams,
                    page: el
                }).toString()
            })
        }
    }

    useEffect(() => {
        setPage(Number(params.get('page')) || 1)
    }, [params])

    const pagination = usePagination(totalProductCount, page)

    return (
        <div className='flex gap-1'>
            {page !== 1 && 
                <div 
                    onClick={() => handleChoosePage(page - 1)}
                    className='w-[42px] h-[42px] flex items-center justify-center border rounded-full cursor-pointer hover:bg-[#DEE2E6]'
                >
                    <FaAngleLeft />
                </div>
            }
            {pagination?.map((item, index) => (
                <div 
                    onClick={() => handleChoosePage(item)}
                    key={index} 
                    className={`w-[42px] h-[42px] flex items-center justify-center border rounded-full cursor-pointer hover:bg-[#DEE2E6] ${Number(item) === (Number(params.get('page') || 1)) ? 'bg-main text-white hover:bg-main' : undefined}`}>
                    {item}
                </div>
            ))}
            {page !== pagination?.[pagination?.length - 1] &&
                <div 
                    onClick={() => handleChoosePage(page + 1)}
                    className='w-[42px] h-[42px] flex items-center justify-center border rounded-full cursor-pointer hover:bg-[#DEE2E6]'
                >
                    <FaAngleRight />
                </div>
            }
        </div>
    )
}

export default memo(Pagination)