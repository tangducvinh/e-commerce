import { Sidebar } from '../../companents'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fecthHome } from '../../store/appSlice'
import { Banner } from '../../companents'
import { advantises } from '../../ultis/contants'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fecthHome())
    })

    return (
        <div className="flex mt-[16px] flex-col items-center">
            <div className="w-[1220px] flex gap-4">
                <div className="w-[220px] rounded-xl shadow-md flex-shrink-0">
                    <Sidebar />
                </div>
                <div className="flex-auto rounded-br-xl rounded-bl-xl shadow-md"><Banner /></div>
                <div className="w-[260px] flex-shrink-0 flex flex-col justify-between">
                    {advantises.map(item => (
                        <img className="rounded-xl" alt='advantise' key={item} src={item}></img>
                    ))}
                </div>
            </div>

            <div className="h-[500px]"></div>
        </div>     
    )
}

export default Home