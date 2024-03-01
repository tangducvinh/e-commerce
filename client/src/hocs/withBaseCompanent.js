import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

export const withBaseCompanent = (Companent) => (pros) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    return <Companent {...pros} dispatch={dispatch} navigate={navigate} location={location}/>
}
