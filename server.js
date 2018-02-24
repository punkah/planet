const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const Datastore = require('@google-cloud/datastore');
const projectId = 'planet-real-estate';
const datastore = new Datastore({
  projectId: projectId,
});

app.use('/', express.static(`${__dirname}/client/build`));

app.get('/api/planets', (req, res) => {
  var query = datastore.createQuery('planet');

  var livable = (req.query.livable == 'true');
  var farmable = (req.query.farmable == 'true');
  var investment = (req.query.investment == 'true');

  if (livable) query = query.filter('isLivable', '=', livable)
  if (farmable) query = query.filter('isFarmable', '=', farmable)
  if (investment) query = query.filter('isInvestment', '=', investment);

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

      res.json(planets);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

app.get('/api/planets/:id', (req, res) => {
  var key = Number(req.params.id);

  var query = datastore.createQuery('planet').filter('__key__', '=', datastore.key(['planet', key]));

  datastore
    .runQuery(query)
    .then(results => {
      const planets = ({
        key: results[0][0][datastore.KEY].id,
        name: results[0][0].name,
        price: results[0][0].price,
        distance: results[0][0].distance,
        isLivable: results[0][0].isLivable,
        isFarmable: results[0][0].isFarmable,
        isInvestment: results[0][0].isInvestment
      });

      res.json(planets);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));