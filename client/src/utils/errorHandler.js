const errorHandler = (error) =>{
    if (error.match('E11000')){
        return 'Username already exists...'
    }
}

export default errorHandler