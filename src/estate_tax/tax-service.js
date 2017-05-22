let property = require("./mock.json");

// type， 住宅类型  普通 normal  非普通 abnormal
// year,  住宅购买年限 1 , 3, 6
// original_value, 住宅最初购买价格 280
// current_value, 住宅当前价格 580
// single, 唯一 true, 不唯一 false
// dimension, 房屋面积
// first, 首套 true, 非首套 false
// unit_price, 房屋单价 52000
// pt, 是否征收房产税 true, false

const type = {
    N: 'normal',
    ABN: 'abnormal'
};

let tax_amount = {
    vat: 0, // 增值税
    ext: 0, // 附加税
    pit: 0, // 个人所得税
    dt: 0, // 契税
    pt: 0 // 房产税
};

function calculate() {
    let total = getGeneralVat("vat") + getGeneralVat("ext") + getPit() + getDt() + getPt();
    console.log(`total is ${total}`);

    console.log(tax_amount);
}

function getPt() {
    let pt = 0;
    if (property.pt) {
        if (property.unit_price <= 51800) {
            pt = property.current_value * 0.7 * 0.04;
        } else {
            pt = property.current_value * 0.7 * 0.06;
        }
    }
    return pt;
}

function getDt() {
    let dt = 0;
    if (property.first) {
        if (property.dimension > 90) {
            dt = (property.current_value - getGeneralVat("vat")) * 0.015;
        } else {
            dt = (property.current_value - getGeneralVat("vat")) * 0.01;
        }
    } else {
        dt = (property.current_value - getGeneralVat("vat")) * 0.03;
    }
    return dt;
}

function getPit() {
    let pit = 0;
    if (property.type === type.ABN) {
        if (property.year < 2
            || (property.year >= 2 && property.year < 5)
            || (property.year > 5 && !property.single)) {
            pit = (property.current_value - getGeneralVat("vat")) * 0.02;
        }
    } else {
        if (property.year < 2) {
            pit = (property.current_value - getGeneralVat("vat")) * 0.01;
        } else if (property.year >= 2 && property.year < 5){
            pit = property.current_value * 0.01;
        } else {
            if (!property.single) {
                pit = property.current_value * 0.01;
            }
        }
    }
    return pit;
}

function getGeneralVat(param) {
    let vat = 0;
    let taxRate = 0.006;
    if (param === "vat") {
        taxRate = 0.05;
    }
    if (property.type === type.ABN) {
        if (property.year < 2) {
            vat = property.current_value / 1.05 * taxRate;
        } else {
            vat = (property.current_value - property.original_value) / 1.05 * taxRate;
        }
    } else {
        if (property.year < 2) {
            vat = property.current_value / 1.05 * taxRate;
        }
    }
    tax_amount.vat = vat;
    return vat;
}

calculate();