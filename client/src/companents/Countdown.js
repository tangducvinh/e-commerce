import { useState, useEffect } from 'react'

const Countdown = () => {
    const [ day, setDay ] = useState()
    const [ hour, setHour ] = useState()
    const [ minute, setMinute ] = useState()
    const [ second, setSecond ] = useState()

    useEffect(() => {
        setDay(1)
        setHour(23)
        setMinute(59)
        setSecond(60)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (second !== 0) setSecond(prev => prev - 1)
            else {
                setSecond(60)
                if (minute !== 0) setMinute(prev => prev - 1)
                else {
                    setMinute(59)
                    if (hour !== 0) setHour(prev => prev - 1)
                    else {
                        setHour(23)
                        if (day !== 0) setDay(prev => prev - 1)
                        else {
                            setDay(1)
                        }
                    }
                }
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [second])

    return (
        <div className="flex gap-1 items-center">
            <p className="text-[#D88B3D] font-bold text-sm">Kết thúc sau:</p>
            <span className="w-[25px] h-[25px] flex items-center text-sm font-bold justify-center bg-btn-yellow rounded-md text-black">{day < 10 ? `0${day}` : day}</span>
            <span className="text-[#D88B3D] font-bold">:</span>
            <span className="w-[25px] h-[25px] flex items-center text-sm font-bold justify-center bg-btn-yellow rounded-md text-black">{hour < 10 ? `0${hour}` : hour}</span>
            <span className="text-[#D88B3D] font-bold">:</span>
            <span className="w-[25px] h-[25px] flex items-center text-sm font-bold justify-center bg-btn-yellow rounded-md text-black">{minute < 10 ? `0${minute}` : minute}</span>
            <span className="text-[#D88B3D] font-bold">:</span>
            <span className="w-[25px] h-[25px] flex items-center text-sm font-bold justify-center bg-btn-yellow rounded-md text-black">{second < 10 ? `0${second}` : second}</span>
        </div>
    )
}

export default Countdown