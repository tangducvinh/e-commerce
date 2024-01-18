
import icons from './icons'

const { FaStar } = icons

export const validate = (data) => {
    const formatArray = Object.entries(data)

    for (let value of formatArray) {
        if (value[1].trim() === '') {
            return `Vui lòng nhập thông tin ${value[0]}`
        }
    }

    for (let value of formatArray) {
        switch(value[0]) {
            case 'email': 
                if (value[1].slice(0, 1) === '0') {
                    if (value[1].length !== 10 || value[1].slice(0, 1) !== '0') {
                        return 'Vui lòng nhập đúng số điện thoại'
                    }
                } else {
                    /* eslint-disable-next-line */
                    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                    if (!value[1].match(regex)) {
                        return 'Vui lòng nhập đúng định dạng email'
                    }
                }
                break
            case 'password':
                if (value[1].length < 6) return 'Mật khẩu phải có tốn thiểu 6 kí tự'
                break
            case 'name':
                if (value[1].length < 3) return 'Tên không hợp lệ vui lòng nhập lại'
                break
            case 'mobile':
                if (value[1].length !== 10 || value[1].slice(0, 1) !== '0') {
                    return 'Vui lòng nhập đÚng số điện thoại'
                }
                break
            default:
        }
    }

    return true

}

export const renderStar = (amount, size) => {
    const arr = []

    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(amount)) arr.push(<FaStar color='#FFBF00' size={size}/>)
        else arr.push(<FaStar color='#EDEDED' size={size}/>)
    }

    return arr
}
