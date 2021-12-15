const Voucher = require("../models/Voucher");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class VoucherController {
  create(req, res, next) {
    res.render("voucher/new");
  }

  store(req, res, next) {
    req.body;
    const voucher = new Voucher(req.body);
    voucher
      .save()
      .then(() => res.redirect("/voucher/listvouchers"))
      .catch(next);
  }

  list(req, res, next) {
    Voucher.find({})
      .then((vouchers) =>
        res.render("voucher/listvouchers", {
          vouchers: mutipleMongooseToObject(vouchers),
        })
      )
      .catch(next);
  }

  edit(req, res, next) {
    Voucher.findOne({ _id: req.params.id })
      .then((voucher) =>
        res.render("voucher/edit", {
          voucher: mongooseToObject(voucher),
        })
      )
      .catch(next);
  }

  update(req, res, next) {
    Voucher.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/voucher/listvouchers"))
      .catch((erorr) => {});
  }

  delete(req, res, next) {
    Voucher.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/voucher/listvouchers"))
      .catch((erorr) => {});
  }
}

module.exports = new VoucherController();
