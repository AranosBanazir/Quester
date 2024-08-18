import Auth from "./auth"
const errorHandler = (error) =>{
    if (Auth.loggedIn()){
        if (error.match('E11000')){
            return 'Username or already exists...'
        }
    }else{
        if (error.match('E11000')){
            return 'Username or Email already exists...'
        }
    }

    return error
}

export default errorHandler