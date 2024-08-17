const errorHandler = (error) =>{
    if (error.match('E11000')){
        return 'Username already exists...'
    }

    return error
}

export default errorHandler