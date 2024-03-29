import { useEffect, useState, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ItemOrder, EmptyPage } from '../../companents'
import * as apis from '../../apis'
import { Pagination } from '../../companents'

const History = () => {
    const [ params ] = useSearchParams()
    const [ dataOrder, setDateOrder ] = useState()

    const fecthUserOder = async(data) => {
        const response = await apis.getUserOder(data)

        console.log(response)

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
            {dataOrder?.data.length === 0 ?
                <div className='mt-10'>
                    <EmptyPage />
                </div>
            :
                dataOrder?.data &&
                    <div className='flex flex-col gap-4'>
                        {[...dataOrder.data]?.reverse().map((item, index) => (
                            <Fragment key={index}>
                                <ItemOrder data={item} />
                            </Fragment>
                        ))}
            
                        <div className='flex justify-center mt-5'>
                            <Pagination totalProductCount={dataOrder?.counts}></Pagination>
                        </div>
                    </div>
                
            }
        </div>
    )
}

export default History