import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const withBaseCompanent = (Companent) => (pros) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return <Companent {...pros} dispatch={dispatch} navigate={navigate}/>
}
