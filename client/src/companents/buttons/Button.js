import { Link } from 'react-router-dom'

const Button = ({icon, text1, text2, amount, path}) => {
    return (
        <Link 
            to={path}
            className="flex items-center text-white px-1 py-1 hover:bg-bg-btn rounded-xl cursor-pointer"
        >
            <div className='relative'>
                {icon}
                {amount !== undefined && <span className='absolute text-[11px] font-semibold bottom-0 left-[50%] translate-x-[-50%]'>{amount}</span>}
            </div>
            <p className="text-[12px] ml-1">
                <span>{text1}</span> 
                <br></br>
                <span>{text2}</span>
            </p>
        </Link>
    )
}

export default Button