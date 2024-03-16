
import emptyPage from '../../assets/imgs/Icons/emptyPage.svg'


const EmptyPage = () => {
    return (
        <div className='flex flex-col items-center gap-5'>
            <img src={emptyPage}></img>
            <p>Không có thông tin nào ở trang này!</p>
        </div>
    )
}

export default EmptyPage