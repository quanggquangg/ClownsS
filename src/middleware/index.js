
module.exports = {
    countCart(req, res, next) {
        var count = 0
        const carts = req.session.cart
        if (typeof req.session.cart !== "undefined") {
            for (var i = 0; i < carts.length; i++) {
                count = count + (carts[i].qty)
            }
        }
        res.locals.count = count
        next()
    },

    loginAuth(req, res, next) {
        var user = req.user
        res.locals.user = user
        next()
    },
    
}
