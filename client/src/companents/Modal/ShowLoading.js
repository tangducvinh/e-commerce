import { Loading } from '../../companents'

const ShowLoading = ({hiddenBackground = false}) => {
    return (
        <div className={`fixed w-screen h-screen flex justify-center items-center ${hiddenBackground ? '' : 'bg-overlayWhite'} z-50`}>
            <Loading />
        </div>
    )
}

export default ShowLoading