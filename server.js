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
  const query = datastore.createQuery('planet');

  datastore
    .runQuery(query)
    .then(results => {
      const planets = results[0].map(x => ({
        key: x[datastore.KEY],
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