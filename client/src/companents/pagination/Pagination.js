import { useSearchParams, createSearchParams } from 'react-router-dom'
import { useState, useEffect, memo } from 'react'

import usePagination from '../../hooks/usePagination'
import icons from '../../ultis/icons'
import { withBaseCompanent } from '../../hocs/withBaseCompanent'

const Pagination = ({ totalProductCount, changeValue, location, navigate }) => {
    const [ params ] = useSearchParams()
    const { FaAngleLeft, FaAngleRight } = icons
    const [ page, setPage ] = useState(1)

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
        const getParams = Object.fromEntries([...params])
        if (changeValue) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({
                    ...getParams,
                    page: 1,
                }).toString()
            })
        }
    }, [changeValue, location.pathname, navigate, params])

    useEffect(() => {
        setPage(Number(params.get('page')) || 1)
    }, [params])

    const pagination = usePagination(totalProductCount, page)

    return (
        <div className='flex gap-1'>
            {page !== 1 && 
                <div 
                    onClick={() => handleChoosePage(page - 1)}
                    className='w-[42px] h-[42px] flex items-center justify-center border border-gray-300 rounded-full cursor-pointer hover:bg-[#DEE2E6]'
                >
                    <FaAngleLeft />
                </div>
            }
            {pagination?.map((item, index) => (
                <div 
                    onClick={() => handleChoosePage(item)}
                    key={index} 
                    className={`w-[42px] h-[42px] flex items-center justify-center border border-gray-300 rounded-full cursor-pointer hover:bg-[#DEE2E6] ${Number(item) === (Number(params.get('page') || 1)) ? 'bg-main text-white hover:bg-main' : undefined}`}>
                    {item}
                </div>
            ))}
            {page !== pagination?.[pagination?.length - 1] &&
                <div 
                    onClick={() => handleChoosePage(page + 1)}
                    className='w-[42px] h-[42px] flex items-center justify-center border border-gray-300 rounded-full cursor-pointer hover:bg-[#DEE2E6]'
                >
                    <FaAngleRight />
                </div>
            }
        </div>
    )
}

export default withBaseCompanent(memo(Pagination))