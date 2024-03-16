import { useParams, useNavigate } from 'react-router-dom'
import path from '../../ultis/path'
import swal from 'sweetalert'

const FinalRegister = () => {
    const { status } = useParams()
    const navigate = useNavigate()
    
    if (status === 'true') {
        swal('Congratulation', 'Đăng kí thành công. Vui lòng đăng nhập', 'success').then(() => {
            navigate(`/${path.ACCOUNT}/${path.LOGIN}`)
        })
    } else {
        swal('Opps', 'Xác thực tài khoản thất bại vui lòng thử lại sau', 'error').then(() => {
            navigate(`/${path.ACCOUNT}/${path.LOGIN}`)
        })
    }

    return (
        <div className='h-screen w-screen bg-gray-100'></div>
    )
}

export default FinalRegister