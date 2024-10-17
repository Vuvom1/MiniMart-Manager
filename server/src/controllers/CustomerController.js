class CustomerController {
    index(req, res) {
        res.send('Customer')
    }
}

module.exports = new CustomerController;