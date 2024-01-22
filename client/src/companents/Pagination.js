import { useSearchParams, useNavigate, useParams, createSearchParams } from 'react-router-dom'

import usePagination from '../hooks/usePagination'

const Pagination = ({ totalProductCount }) => {
    const [ params] = useSearchParams()
    const { category } = useParams()
    const navigate = useNavigate()

    const handleChoosePage = (el) => {
        if (Number(el)) {
            const getParams = {}
            for (let i of params.entries()) {
                getParams[i[0]] = i[1]
            }

            navigate({
                pathname: `/products/${category}`,
                search: createSearchParams({
                    ...getParams,
                    page: el
                }).toString()
            })
        }
    }

    const pagination = usePagination(totalProductCount, params.get('page') || 1)
    
    return (
        <div className='flex gap-1'>
            {pagination?.map((item, index) => (
                <div 
                    onClick={() => handleChoosePage(item)}
                    key={index} 
                    className={`w-[42px] h-[42px] flex items-center justify-center border rounded-full cursor-pointer hover:bg-[#DEE2E6] ${Number(item) === (Number(params.get('page') || 1)) ? 'bg-main text-white hover:bg-main' : undefined}`}>
                    {item}
                </div>
            ))}
        </div>
    )
}

export default Pagination