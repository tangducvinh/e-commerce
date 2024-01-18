import icons from './icons'
import path from './path'

const {
    HiOutlineDevicePhoneMobile,
    BsLaptop,
    IoHeadsetOutline,
    IoWatchOutline,
    IoHomeOutline,
    BsUsbDrive,
    PiTelevisionSimple,
    FaTabletAlt,
    IoCameraOutline,
    GiPressureCooker,
    SlScreenDesktop,
    GoArrowLeft,
    FaSortAmountDown,
    FaSortAmountUp,
    RiPercentLine,
    FaRegEye,
    FaStar,
} = icons

export const iconSidebar = [
    <HiOutlineDevicePhoneMobile size={25} />,
    <FaTabletAlt size={25}/>,
    <BsLaptop size={25} />,
    <IoHeadsetOutline size={25} />,
    <IoWatchOutline size={25} />,
    <IoCameraOutline size={25}/>,
    <GiPressureCooker size={25}/>,
    <IoHomeOutline size={25} />,
    <BsUsbDrive size={25} />,
    <SlScreenDesktop size={25} />,
    <PiTelevisionSimple size={25} />,
]

export const advantises = [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-fold5-th122.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/gen%209.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/%C6%B0u-dai-sinhvien-chung-right-banner.png'
]

export const navHotSales = [
    {
        title: 'Điện thoại',
        filter: 'smartphone',
    },
    {
        title: 'Loptop',
        filter: 'laptop',
    },
    {
        title: 'Phụ kiện',
        filter: 'accessory',
    },
    {
        title: 'Smarthome',
        filter: 'smarthome',
    },
]

export const theme = [
    {
        title: 'ĐIỆN THOẠI NỔI BẬT NHẤT',
        filter: 'smartphone',
        row: 2,
    },
    {
        title: 'LAPTOP',
        filter: 'laptop',
        row: 2,
    },
    {
        title: 'MÀN HÌNH, MÁY TÍNH ĐỂ BÀN',
        filter: 'monitor',
        row: 1,
    },
    {
        title: 'MÁY TÍNH BẢNG',
        filter: 'tablet',
        row: 1,
    },
    {
        title: 'ÂM THANH',
        filter: 'audio',
        row: 1,
    },
    {
        title: 'ĐỒNG HỒ',
        filter: 'watch',
        row: 1,
    },
    {
        title: 'GIA DỤNG',
        filter: 'appliances',
        row: 1,
    },
    {
        title: 'TI VI',
        filter: 'tivi',
        row: 1,
    },
]

export const dataRegister = {
    id: 1,
    navigate: `/${path.LOGIN}`,
    link: `${process.env.REACT_APP_API_URI}${path.USER_REGISTER}`,
    icon: <GoArrowLeft size={30} color="#4A4A4A"/>,
    image: 'https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png',
    title: 'Đăng ký tài khoản Smember',
    initData: {
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        introduce: '',
    },
    options: [
        {
            placeholder: 'Nhập họ và tên',
            label: 'HỌ VÀ TÊN (*)',
            name: 'name'
        },
        {
            placeholder: 'Nhập số điện thoại',
            label: 'NHẬP SỐ ĐIỆN THOẠI (*)',
            name: 'mobile',
        },
        {
            placeholder: 'Nhập email (không bắt buộc)',
            label: 'EMAIL',
            description: 'Hoá đơn VAT khi mua hàng sẽ được gửi qua email này',
            name: 'email'
        },
        {
            placeholder: 'Nhập mật khẩu',
            label: 'NHẬP MẬT KHẨU (*)',
            description: '(*) Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chứ và 1 số. (VD: 12345a)',
            name: 'password',
            type: 'password'
        },
        {
            placeholder: 'Nhập lại mật khẩu',
            label: 'XÁC NHẬN MẬT KHẨU (*)',
            name: 'confirmPassword',
            type: 'password'
        },
    ],
    // clause: [
    //     'Đăng ký nhận bản tin khuyến mãi từ CellphoneS',
    //     'Tôi đồng ý với các điều khoản bảo mật cá nhân'
    // ],
    name: 'Đăng ký',
    description: 'hoặc đăng ký bằng',
    question: 'Bạn đã có tài khoản?',
    require: 'Đăng nhập ngay',
}

export const dataLogin = {
    id: 2,
    navigate: `/${path.REGISTER}`,
    link: `${process.env.REACT_APP_API_URI}${path.USER_LOGIN}`,
    image: 'https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png',
    title: 'Đăng nhập tài khoản Smember',
    initData: {
        email: '',
        password: '',
    },
    options: [
        {
            label: 'SỐ ĐIỆN THOẠI/EMAIL',
            placeholder: "Nhập số điện thoại/email",
            name: 'email',
        },
        {
            label: 'MẬT KHẨU',
            placeholder: "Nhập mật khẩu",
            name: 'password',
            type: 'password'
        },
    ],
    forgot: 'Quên mật khẩu?',
    name: 'Đăng nhập',
    description: 'hoặc đăng nhập bằng',
    question: 'Bạn chưa có tài khoản?',
    require: 'Đăng ký ngay',
}

export const filters = [
    {   
        id: 0,
        icon: <FaSortAmountDown />,
        content: 'Giá Cao - Thấp',
        sort: '-priceSort'
    },
    {
        id: 1,
        icon: <FaSortAmountUp />,
        content: 'Giá Thấp - Cao',
        sort: 'priceSort'
    },
    {
        id: 2,
        icon: <RiPercentLine />,
        content: 'Khuyến Mãi Hot',
        sort: '-discount',
    }, 
    {
        id: 3,
        icon: <FaRegEye />,
        content: 'Xem nhiều'
    }
]

export const filterStar = [
    {
        amont: 5,
        star: <FaStar color='#FFBF00' />
    },
    {
        amont: 4,
        star: <FaStar color='#FFBF00' />
    },
    {
        amont: 3,
        star: <FaStar color='#FFBF00' />
    },
    {
        amont: 2,
        star: <FaStar color='#FFBF00' />
    },
    {
        amont: 1,
        star: <FaStar color='#FFBF00'/>
    }
]

