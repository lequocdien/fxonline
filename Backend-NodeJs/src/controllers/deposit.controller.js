const { execFunc } = require('../db');

const deposit = (req, res, next) => {
    const { usr } = res.identity;
    const { MaTKGD, SoTien, TenChuThe, SoTKNH, TenNganHang, TenChiNhanh } = req.body;
    execFunc('fn_deposit($1::varchar, $2::int4, $3::float4, $4::varchar, $5::varchar, $6::varchar, $7::varchar)', [usr, MaTKGD, SoTien, TenChuThe, SoTKNH, TenNganHang, TenChiNhanh])
        .then(data => res.send(data))
        .catch(err => next(err));
}

module.exports = {
    deposit
}