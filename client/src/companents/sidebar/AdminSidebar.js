import { NavLink } from 'react-router-dom'
import { Fragment, useState } from 'react'

import { adminSidebar } from '../../ultis/contants'


const AdminSidebar = () => {
    const [ showSub, setShowSub ] = useState([])

    const handleSetShow = (id) => {
        if (showSub?.some(item => item === id)) {
            console.log(id)
            setShowSub(prev => prev.filter(el => el !== id))
        } else setShowSub(prev => [...prev, id])
    }

    return (
        <div>
            {adminSidebar.map(item => (
               <Fragment key={item.id}>
                    {item.type === 'singer' && 
                        <NavLink to={item.path} className={({isActive}) => isActive ? 'flex text-[15px] items-center rounded-xl py-2 text-main px-4 border-main border bg-[#FFEEEE]' : 'flex border text-[15px] border-transparent items-center py-2 px-4' }>
                            <span className='min-w-[35px]'>{item.icon}</span>
                            <span >{item.text}</span>
                        </NavLink>
                    }   
                    {item.type == 'parent' && 
                        <div>
                            <div 
                                onClick={() => handleSetShow(item.id)}
                                className='flex items-center py-2 px-4 cursor-pointer text-[15px]'
                            >
                                <span className='min-w-[35px]'>{item.icon}</span>
                                <span>{item.text}</span>
                                {showSub?.some(el => el === item.id) ?
                                    <span className='flex-1 flex justify-end'>{item.iconDown}</span>
                                    :
                                    <span className='flex-1 flex justify-end'>{item.iconRight}</span>
                                }
                            </div>
                            {showSub?.some(id => id === item.id) && 
                                <div className='flex ml-3 flex-col'>
                                    {item.subMenu.map(el => (
                                        <NavLink key={el.sid} to={el.path} className={({isActive}) => isActive ? 'flex text-[15px] text-main items-center rounded-xl py-2 px-4 border-main gap-2 border bg-[#FFEEEE]' : 'flex border gap-2 text-[15px] border-transparent items-center py-2 px-4'}>
                                            {item.iconRight}
                                            <span>{el.text}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            }
                        </div>
                    }
                </Fragment>
            ))}
        </div>
    )
}

export default AdminSidebar