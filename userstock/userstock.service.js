const db = require('_helpers/db');
const UserStock = db.UserStock;

module.exports = {
    create,
    getAll,
    getUserStockMarket,
    getStockMarket,
    update,
    delete: _delete
};

const currentRates=[
    {"companyName":"ISSB","rate":"32"},
    {"companyName":"GrameenPhone","rate":"30"},
    {"companyName":"Beximco","rate":"28"},
    {"companyName":"AB Bank","rate":"21"},
]

async function create(userStockParam) {
    // validate   
    if (await UserStock.findOne({ companyName: userStockParam.companyName })) {
        throw 'Company Name "' + userStockParam.companyName + '" is already taken';
    }

    const userStock = new UserStock(userStockParam);

    // save UserStock
    await userStock.save();
}

async function getAll() {
    return await UserStock.find();
}

async function getUserStockMarket(id) {
    let stockmarkets=[];
    let userStocks = await UserStock.find();
    
    stockmarkets = userStocks.map(s=> {return {"companyName":s.companyName,
    "purchaseDate":s.purchaseDate,
    "quantity":s.quantity,
    "purchaseRate":s.purchaseRate,
    "marketRate":currentRates.find(e=>e.companyName===s.companyName).rate}});
    return stockmarkets;
}

async function getStockMarket() {    
    return currentRates;
}


async function update(id, userStockParam) {
    const userStock = await UserStock.findById(id);

    // validate
    if (!userStock) throw 'UserStock not found';
    if (userStock.companyName !== userStockParam.companyName && await UserStock.findOne({ companyName: userStockParam.companyName })) {
        throw 'Company Name "' + userStockParam.companyName + '" is already taken';
    }

    // copy UserStockParam properties to UserStock
    Object.assign(userStock, userStockParam);

    await UserStock.save();
}

async function _delete(id) {
    await UserStock.findByIdAndRemove(id);
}