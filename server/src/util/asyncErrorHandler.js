module.exports = (func) => {
    return async (req, res, next) => {
        // func(req, res, next).catch(err=>next(err));
        func(req, res, next).catch(err => {
            console.error(err);
            next(err);
        });
    };
}