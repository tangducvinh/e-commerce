import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sidebar, Banner, HotSale, SlickProduct } from '../../companents'
import { fecthHome, fecthTheme } from '../../store/appSlice'
import { advantises, theme } from '../../ultis/contants'

const Home = () => {
    const dispatch = useDispatch()
    const { dataTheme } = useSelector(state => state.app)

    useEffect(() => {
        dispatch(fecthHome())
        dispatch(fecthTheme(theme))
    }, [])

    return (
        <div className="flex mt-[16px] flex-col items-center px-[10px]">
            <div className="w-[1220px] flex gap-4">
                <div className="w-[220px] rounded-xl shadow-md flex-shrink-0">
                    <Sidebar />
                </div>
                <div className="flex-auto rounded-br-xl rounded-bl-xl shadow-md"><Banner /></div>
                <div className="w-[260px] flex-shrink-0 flex flex-col justify-between">
                    {advantises.map((item, index) => (
                        <img className="rounded-xl" alt='advantise' key={index} src={item}></img>
                    ))}
                </div>
            </div>

            <div className="mt-4 w-main">
                <HotSale />
            </div>

            {dataTheme.map((item, index) => (
                <div className="mt-4 w-main" key={index}>
                    <SlickProduct data={item.items} row={item.row} title={item.title} incentives/>
                </div>
            ))}

            <div className="h-[500px]"></div>

        </div>     
    )
}

export default Home