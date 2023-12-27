import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'


const Banner = () => {
    const { banner } = useSelector(state => state.app)
    const [ number, setNumber ] = useState(0)
    
    
    useEffect(() => {
        const setInter = setInterval(() => {
            if (number === banner.length - 1) {
                setNumber(prev => prev = 0)
            } else {
                setNumber(prev => prev + 1)
            }
        }, 5000)

        return () => {
            clearInterval(setInter)
        }
    }, [number])

    console.log(number)

    return (
        <div> 
            {banner.map((item, index) => (
                (index === number && 
                    <img className="w-full object-cover" src={item.link} key={index}></img>
                )
            ))}

            <div className="flex pl-4 overflow-auto select-none">
                {banner.map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => setNumber(index)}
                        className={`flex flex-col p-4 items-center border-b-2 cursor-pointer flex-shrink-0 text-gray-600 hover:bg-hv ${index === number ? 'border-main' : 'border-transparent'}`}
                    >
                        <span className="text-sm">{item.name}</span>
                        <span className="text-[12px]">{item.description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Banner