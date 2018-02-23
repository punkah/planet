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

app.listen(port, () => console.log(`Listening on port ${port}`));