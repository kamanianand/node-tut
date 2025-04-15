const errorMiddleware = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
        error
    });
};


module.exports = errorMiddleware