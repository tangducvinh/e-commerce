import icons from './icons'
import path from './path'
import banner1 from '../assets/imgs/banner/banner1.png'
import banner2 from '../assets/imgs/banner/banner2.png'
import banner3 from '../assets/imgs/banner/banner3.png'
import banner4 from '../assets/imgs/banner/banner4.png'
import banner5 from '../assets/imgs/banner/banner5.png'
import banner6 from '../assets/imgs/banner/banner6.png'
import banner7 from '../assets/imgs/banner/banner7.png'
import banner8 from '../assets/imgs/banner/banner8.png'
import banner9 from '../assets/imgs/banner/banner9.png'
import banner10 from '../assets/imgs/banner/banner10.png'
import advantise1 from '../assets/imgs/advantises/advantise1.png'
import advantise2 from '../assets/imgs/advantises/advantise2.png'
import advantise3 from '../assets/imgs/advantises/advantiste3.png'

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
    MdOutlineDashboardCustomize,
    FaRegUser,
    MdManageSearch,
    RiBillLine,
    FaChevronDown,
    MdOutlinePersonalInjury,
    BsCart2,
    GoHistory,
    LiaClipboardListSolid
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
    advantise1,
    advantise2,
    advantise3
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
        content: 'Xem nhiều',
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

export const starVote = [
    {
        id: 1,
        title: 'Rất tệ',
    },
    {
        id: 2,
        title: 'Tệ',
    },
    {
        id: 3,
        title: 'Bình thường',
    },
    {
        id: 4,
        title: 'Tốt',
    },
    {
        id: 5,
        title: 'Tuyệt vời',
    }
]

export const banners = [
    {
        description: 'Đặt ngay giá sốc',
        link: banner1,
        name: 'GALAXY S24 SERIES'
    },
    {
        description: 'Sẵn hàng mua ngay',
        link: banner2,
        name: 'IPHONE 15'
    },
    {
        description: 'Mua ngay giá tốt',
        link: banner3,
        name: 'REDMI NOTE 13'
    },
    {
        description: 'Rinh ngay quà chất',
        link: banner4,
        name: 'HUAWEI ULTIMATE'
    },
    {
        description: 'Mua ngay giá tốt',
        link: banner5,
        name: 'REDMI WATCH 4'
    },
    {
        description: 'Hiệu năng hàng đầu',
        link: banner6,
        name: 'ASUS ROG STRIX'
    },
    {
        description: 'Chiến game sống động',
        link: banner7,
        name: 'INZONE BUDS'
    },
    {
        description: 'Mở bán deal hời',
        link: banner8,
        name: 'GALAXY A15 | A25'
    },
    {
        description: 'Làm chủ 4G',
        link: banner9,
        name: 'THU CŨ 2G'
    },
    {
        description: 'Săn ngay deal hot',
        link: banner10,
        name: 'VIVO V29E'
    },

]

export const adminSidebar = [
    {
        id: 1,
        type: 'singer',
        text: 'Thống kê',
        icon: <MdOutlineDashboardCustomize size={20} />,
        path: `/admin/${path.DASHBOARD}`
    },
    {
        id: 2,
        type: 'singer',
        text: 'Quản lí người dùng',
        icon: <FaRegUser size={20} />,
        path:  `/admin/${path.MANAGE_USER}`
    },
    {
        id: 3,
        type: 'singer',
        text: 'Quản lí sản phẩm',
        icon: <MdManageSearch size={25}/>,
        iconDown: <FaChevronDown size={17} />,
        path: `/admin/${path.MANAGE_PRODUCTS}`
    },
    {
        id: 4,
        type: 'singer',
        text: 'Quản lí hoá đơn',
        icon: <RiBillLine size={20} />,
        path: `/admin/${path.MANAGE_BILL}`,
    }
]

export const profile = [
    {
        id: 1,
        type: 'singer',
        text: 'Thông tin cá nhân',
        icon: <MdOutlinePersonalInjury size={20} />,
        path: `/${path.MEMBER}/${path.PERSONAL}`
    },
    {
        id: 2,
        type: 'singer',
        text: 'Giỏ hàng',
        icon: <BsCart2 size={20} />,
        path:  `/${path.MEMBER}/${path.MYCART}`
    },
    {
        id: 3,
        type: 'singer',
        text: 'Danh sách yêu thích',
        icon: <LiaClipboardListSolid size={25}/>,
        path: `/${path.MEMBER}/${path.WISHLIST}`
    },
    {
        id: 4,
        type: 'singer',
        text: 'Lịch sử mua hàng',
        icon: <GoHistory size={20} />,
        path: `/${path.MEMBER}/${path.HISTORY}`,
    }
]

export const rules = [
    {
        role: '7',
        value: 'Quản lí'
    },
    {
        role: '3',
        value: 'Khách hàng'
    },
    {
        role: '5',
        value: 'Nhân viên'
    },
]

export const EditInfors = [
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
        name: 'email'
    },
]

export const inputSelectRole = {
    label: 'role',
    name: 'role',
    options: [
        {
            value: '7',
            text: 'QUẢN LÍ',
        },
        {
            value: '3',
            text: 'KHÁCH HÀNG',
        },
        {
            value: '5',
            text: 'NHÂN VIÊN',
        },
    ]
}

export const inputSelectStatusUser = {
    label: 'tình trạng',
    name: 'status',
    options: [
        {
            value: false,
            text: 'HOẠT ĐỘNG',
        },
        {
            value: true,
            text: 'BỊ CHẶN',
        },
    ]
}

