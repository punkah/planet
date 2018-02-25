const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const model = require('./model-datastore');

app.use('/', express.static(`${__dirname}/client/build`));

app.get('/api/planets', (req, res) => {

  var livable = (req.query.livable == 'true');
  var farmable = (req.query.farmable == 'true');
  var investment = (req.query.investment == 'true');

  var planets = model.getPlanets(livable, farmable, investment, (err, planets) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    } else {
      res.json(planets);
    }
  });
});

app.get('/api/planets/:id', (req, res) => {

  var key = Number(req.params.id);

  var planet = model.getPlanet(key, (err, planet) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    } else {
      res.json(planet);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));