import Slice from 'react-slick'
import { memo } from 'react'

import { ItemProduct } from './'

const SlickProduct = ({ data, title, row = 1, incentives }) => {

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        rows: row,
        slidesPerRow: 1
    }

    return (
        <div >
            {title && 
                <div className="h-10 flex items-center mb-2">
                    <h1 className="text-[22px] text-[#444444] font-bold">{title}</h1>
                </div>
            }
            <Slice {...settings}>
                {data?.map((item, index) => (
                    <ItemProduct 
                        key={index}
                        image = {item?.images[0]}
                        discount = {item?.discount}
                        title = {item?.title}
                        price = {item?.price?.price}
                        sale = {item?.price?.sale}
                        star = {item?.star}
                        incentives = {incentives ? item.incentives[0] : false}
                        link = {item?._id}
                    />
                ))}
            </Slice>
        </div>
    )
}

export default memo(SlickProduct)