const express = require('express');
const router = express.Router();
const UserStockService = require('./userstock.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/getUserStockMarket', getUserStockMarket);
router.get('/getStockMarket', getStockMarket);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function create(req, res, next) {
    UserStockService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    UserStockService.getAll()
        .then(userstocks => res.json(userstocks))
        .catch(err => next(err));
}
function getUserStockMarket(req, res, next) {
    UserStockService.getUserStockMarket('11')
        .then(userstocks => res.json(userstocks))
        .catch(err => next(err));
}
function getStockMarket(req, res, next) {
    UserStockService.getStockMarket()
        .then(userstocks => res.json(userstocks))
        .catch(err => next(err));
}

function update(req, res, next) {
    UserStockService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    UserStockService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}