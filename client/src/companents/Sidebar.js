import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import icons from '../ultis/icons'
import { iconSidebar } from '../ultis/contants'
import { categorySelector } from '../store/selectors'

const Sidebar = () => {
    const { categorys } = useSelector(categorySelector)
    const { FaChevronRight } = icons

    return (
        <div className="flex flex-col">
            {categorys?.data?.map((item, index) => (
                <div 
                    key={index}
                    className="flex items-center px-[10px] py-1 rounded-xl cursor-pointer hover:bg-hv"
                >
                    <div className="flex-auto flex items-center">
                        {iconSidebar[index]}
                        <Link className="text-[12px] text-sidebar font-[700] ml-1 hover:text-main">{item.title}</Link>
                    </div>

                    <FaChevronRight color="gray"/>
                </div>
            ))}
        </div>
    )
}

export default Sidebar