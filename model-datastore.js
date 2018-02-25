'use strict';

const Datastore = require('@google-cloud/datastore');
const projectId = 'planet-real-estate';
const datastore = new Datastore({projectId: projectId});

const kind = 'planet';

function getPlanets(livable, farmable, investment, callback) {

    var query = datastore.createQuery('planet');

    if (livable) 
        query = query.filter('isLivable', '=', livable)
    if (farmable) 
        query = query.filter('isFarmable', '=', farmable)
    if (investment) 
        query = query.filter('isInvestment', '=', investment);
    
    datastore
        .runQuery(query)
        .then(results => {
            const planets = results[0].map(x => ({
                key: x[datastore.KEY].id,
                name: x.name,
                price: x.price,
                distance: x.distance,
                isLivable: x.isLivable,
                isFarmable: x.isFarmable,
                isInvestment: x.isInvestment
            }));

            callback(null, planets);
        })
        .catch(err => {
            callback(err);
        });
}

function getPlanet(key, callback) {

    var query = datastore
        .createQuery('planet')
        .filter('__key__', '=', datastore.key(['planet', key]));

    datastore
        .runQuery(query)
        .then(results => {
            const planet = ({key: results[0][0][datastore.KEY].id,
                name: results[0][0].name,
                price: results[0][0].price,
                distance: results[0][0].distance,
                isLivable: results[0][0].isLivable,
                isFarmable: results[0][0].isFarmable,
                isInvestment: results[0][0].isInvestment
            });

            callback(null, planet);
        })
        .catch(err => {
            callback(err);
        });
}

module.exports = {
    getPlanets,
    getPlanet
};