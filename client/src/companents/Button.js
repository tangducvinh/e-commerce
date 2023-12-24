

const Button = ({icon, text1, text2}) => {
    return (
        <div className="flex items-center text-white px-1 py-1 hover:bg-bg-btn rounded-xl cursor-pointer">
            {icon}
            <p className="text-[12px] ml-1">
                <span>{text1}</span> 
                <br></br>
                <span>{text2}</span>
            </p>
        </div>
    )
}

export default Button