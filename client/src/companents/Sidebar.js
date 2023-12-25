import { Link } from 'react-router-dom'
import icons from '../ultis/icons'
import { iconSidebar } from '../ultis/contants'
import { useState, useEffect } from 'react'
import { apiGetCategory } from '../apis/app'

const Sidebar = () => {
    const { FaChevronRight } = icons
    const [ categorys, setCategorys ] = useState(null)

    const fecthApiCategory = async() => {
        const response = await apiGetCategory()
        if (response.data.success) setCategorys(response.data.data)
    }

    useEffect(() => {
        fecthApiCategory()
    }, [])

    return (
        <div className="flex flex-col">
            {categorys?.map((item, index) => (
                <div className="flex items-center px-[10px] py-1 rounded-xl cursor-pointer hover:bg-hv">
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