import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import icons from '../../ultis/icons'

import { banners } from '../../ultis/contants'

const Banner = () => {
    const { banner } = useSelector(state => state.app)
    const [ number, setNumber ] = useState(0)
    const { AiOutlineRight, AiOutlineLeft } = icons

    const nextElement = useRef()
    const prevElement = useRef()

    useEffect(() => {
        const setInter = setInterval(() => {
            if (number === banner.length - 1) {
                setNumber(0)
            } else {
                setNumber(prev => prev + 1)
            }
        }, 5000)

        return () => {
            clearInterval(setInter)
        }
    }, [number, banner.length])

    const handleShow = () => {
        nextElement.current.classList.remove('slide-right1')
        prevElement.current.classList.remove('slide-left2')

        nextElement.current.classList.add('slide-left1')
        prevElement.current.classList.add('slide-right2')
    }

    const handleHidden = () => {
        nextElement.current.classList.remove('slide-left1')
        prevElement.current.classList.remove('slide-right2')

        nextElement.current.classList.add('slide-right1')
        prevElement.current.classList.add('slide-left2')
    }

    return (
        <div className="flex flex-col"> 
            <div 
                className="flex flex-1 relative overflow-hidden"
                onMouseEnter={() => handleShow()}
                onMouseLeave={() => handleHidden()}
            >
                <img 
                    className="object-cover w-full cursor-pointer" src={banners[number]?.link}
                    alt='banner'
                ></img>

                <div 
                    ref={nextElement}
                    onClick={() => number === banner.length - 1 ? setNumber(0) : setNumber(prev => prev + 1)}
                    className="absolute top-[40%] right-[-50px] w-[35px] h-[55px] rounded-l-[100px] flex justify-center items-center bg-navigation cursor-pointer" 
                >
                    <AiOutlineRight size={27} color="#ccc"/>
                </div>
                
                <div 
                    ref={prevElement}
                    onClick={() => number === 0 ? setNumber(banner.length - 1) : setNumber(prev => prev - 1)}
                    className="absolute top-[40%] left-[-50px] w-[35px] h-[55px] rounded-r-[100px] flex justify-center items-center bg-navigation cursor-pointer" 
                >
                    <AiOutlineLeft size={27} color="#ccc"/>
                </div>
            </div>

            <div className="flex pl-4 select-none h-[70px] relative overflow-hidden">
                <div className="flex absolute overflow-x-scroll w-full scroll-smooth">
                    {banners.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => setNumber(index)}
                            className={`flex text-[12px] flex-col p-4 flex-shrink-0 items-center border-b-2 cursor-pointer text-gray-600 hover:bg-hv ${index === number ? 'border-main' : 'border-transparent'}`}
                        >
                            <span className={number === index ? 'text-black font-[500]' : undefined}>{item.name}</span>
                            <span className={number === index ? 'text-black font-[500]' : undefined}>{item.description}</span>
                        </div>  
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Banner