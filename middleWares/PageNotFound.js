const pageNotFound = (req, res) =>{
    res.status(404).json({
       msg: 'Oops!, Page not found. Please trx again'
    })
} 

module.exports = pageNotFound