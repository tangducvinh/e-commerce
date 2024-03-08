import { useEffect, useState } from 'react'

import { ItemOrder } from '../../companents'
import * as apis from '../../apis'

const History = () => {

    const [ dataOrder, setDateOrder ] = useState()

    const fecthUserOder = async() => {
        const response = await apis.getUserOder()

        if (response.data.success) {
            setDateOrder(response.data.data)
        }
    }

    useEffect(() => {
        fecthUserOder()
    }, [])

    return (
        <div className='w-full flex flex-col mb-[20px] gap-[20px]'>
            {dataOrder?.map((item, index) => (
                <ItemOrder data={item} />
            ))}


        </div>
    )
}

export default History