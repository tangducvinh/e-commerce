
import icons from '../../ultis/icons'
import dienthoaivui from '../../assets/imgs/advantises/dienthoaivui.png'
import apple from '../../assets/imgs/advantises/upquanapple.png'
import moi from '../../assets/imgs/advantises/cnmoi.png'

const Footer = () => {
    const { 
        FaCcPaypal, 
        FaCcApplePay, 
        FaCcAmazonPay, 
        MdOutlinePayment, 
        BsCash, 
        SiBitcoincash, 
        FaFacebookSquare,
        FaYoutube,
        FaInstagram,
        FaTiktok,
        FaRocketchat,
    } = icons

    return (
        <div className='flex gap-[30px] justify-between w-main'>
            <div>
                <h3 className="text-[#363636] font-[500] text-[16px] mt-2">Tổng đài hỗ trợ miễn phí</h3>

                <ul className='ml-2 text-[12px] text-[#4A4A4A]'>
                    <li className='py-1'>Gọi mua hàng 1800.2097 (7h30 - 22h00)</li>
                    <li className='py-1'>Gọi khiếu nại 1800.2063 (8h00 - 21h30)</li>
                    <li className='py-1'>Gọi bảo hành 1800.2064 (8h00 - 21h00)</li>
                </ul>

                <h3 className="text-[#363636] font-[500] text-[16px] mt-2">Phương thức thanh toán</h3>

                <div className="flex items-center flex-wrap">
                    <p className='ml-2 w-five mb-2'><FaCcPaypal size="30px" /> </p>
                    <p className='ml-2 w-five mb-2'><FaCcApplePay size="30px"/>  </p>
                    <p className='ml-2 w-five mb-2'><FaCcAmazonPay size='30px' /> </p>
                    <p className='ml-2 w-five mb-2'><MdOutlinePayment size='30px' /> </p>
                    <p className='ml-2 w-five mb-2'><BsCash size='30px' /> </p>
                    <p className='ml-2 w-five mb-2'><SiBitcoincash /> </p>
                </div>
            </div>

            <div>
                <h3 className="text-[#363636] font-[500] text-[16px] mt-2">Thông tin và chính sách</h3>

                <ul className='ml-2 text-[12px] text-[#4A4A4A]'>
                    <li className='py-1'>Mua hàng trả góp Online</li>
                    <li className='py-1'>Mua hàng và thanh toán Online</li>
                    <li className='py-1'>Mua hàng trả góp bằng thẻ tín dụng</li>
                    <li className='py-1'>Chính sách giao hàng</li>
                    <li className='py-1'>Tra điểm Smember</li>
                    <li className='py-1'>Xem ưu đãi Smember</li>
                    <li className='py-1'>Tra thông tin bảo hành</li>
                    <li className='py-1'>Tra cứu hoá đơn điện tử</li>
                    <li className='py-1'>Thông tin hoá đơn mua hàng</li>
                    <li className='py-1'>Trung tâm bảo hành chính hãng</li>
                    <li className='py-1'>Quy định về việc sao lưu dữ liệu</li>
                </ul>

            </div>

            <div>
                <h3 className="text-[#363636] font-[500] text-[16px] mt-2">Dịch vụ và thông tin khác</h3>

                <ul className='ml-2 text-[12px] text-[#4A4A4A]'>
                    <li className='py-1'>Khách hàng doanh nghiệp (B2B)</li>
                    <li className='py-1'>Ưu đãi thanh toán</li>
                    <li className='py-1'>Quy chế hoạt động</li>
                    <li className='py-1'>Chính sách bảo mật thông tin cá nhân</li>
                    <li className='py-1'>Chính sách Bảo hành</li>
                    <li className='py-1'>Liên hệ hợp tác kinh doanh</li>
                    <li className='py-1'>Tuyển dụng</li>
                    <li className='py-1'>Dịch vụ bảo hành điện thoại</li>
                    <li className='py-1'>Dịch vụ bảo hành mở rộng</li>
                </ul>
            </div>

            <div>
                <h3 className="text-[#363636] font-[500] text-[16px] mt-2">Kết nối với CellphoneS</h3>

                <ul className='flex items-center flex-wrap'>
                    <li className='ml-2 w-five'><FaFacebookSquare size='30px' /></li>
                    <li className='ml-2 w-five'><FaYoutube size='30px' /></li>
                    <li className='ml-2 w-five'><FaInstagram size='30px'/></li>
                    <li className='ml-2 w-five'><FaTiktok size='30px'/></li>
                    <li className='ml-2 w-five'><FaRocketchat gram size='30px'/></li>
                </ul>

                <h3 className="text-[#363636] font-[500] text-[16px] mt-2">Website thành viên</h3>

                <ul className='ml-2 text-[12px] text-[#4A4A4A]'>
                    <li className='py-1'>
                        Hệ thống bảo hành sửa chữa Điện thoại - Máy tính
                        <img src={dienthoaivui}></img>
                    </li>
                    <li className='py-1'>
                        Ưu đãi thanh toán
                        <img src={apple}></img>
                    </li>
                    <li className='py-1'>
                        Trang thông tin công nghệ mới nhất
                        <img src={moi}></img>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Footer