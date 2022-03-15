module.exports = {
    mongoDbUrl: 'mongodb+srv://admibn:admin1234@cluster0.ce3kq.mongodb.net/soccer?retryWrites=true&w=majority',
    // mongoDbUrl : 'mongodb+srv://admin:123123123@cluster0.6aakv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');


        next();
    }
}