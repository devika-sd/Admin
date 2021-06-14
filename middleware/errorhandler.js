function errorHandler (err, req, res, next) {
    console.log("error handler invoked");
     res.status(500).json({success: false, message: err.message})
   }

module.exports=errorHandler;