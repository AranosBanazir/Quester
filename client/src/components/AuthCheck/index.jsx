
import Auth from '../../utils/auth'
import { useNavigate } from 'react-router-dom';

 const AuthCheck = ({children}) =>{
    const navigate = useNavigate()
    if (!Auth.loggedIn()){
        navigate('/login')
    }
    
    return children
}

export default AuthCheck