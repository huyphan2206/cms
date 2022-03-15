module.exports = {
    mongoDbUrl: 'mongodb+srv://admin:123123123@cluster0.6aakv.mongodb.net/test',
    // mongoDbUrl : 'mongodb+srv://admin:123123123@cluster0.6aakv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');


        next();
    }
}