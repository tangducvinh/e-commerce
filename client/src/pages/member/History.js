import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ItemOrder } from '../../companents'
import * as apis from '../../apis'
import { Pagination } from '../../companents'

const History = () => {
    const [ params ] = useSearchParams()
    const [ dataOrder, setDateOrder ] = useState()

    const fecthUserOder = async(data) => {
        const response = await apis.getUserOder(data)

        if (response.data.success) {
            setDateOrder(response.data)
        }
    }

    useEffect(() => {
        const getParams = Object.fromEntries([...params])
        fecthUserOder({...getParams})

        window.scrollTo(0, 0)
    }, [params])

    return (
        <div className='w-full flex flex-col mb-[20px] gap-[20px] min-h-main'>
            {dataOrder?.data.map((item, index) => (
                <ItemOrder data={item} />
            ))}

            <div className='flex justify-center'>
                <Pagination totalProductCount={dataOrder?.counts}></Pagination>
            </div>
        </div>
    )
}

export default History