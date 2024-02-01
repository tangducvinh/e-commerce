import { PulseLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div>
            <PulseLoader
                color={'#D70018'}
                loading={true}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loading
