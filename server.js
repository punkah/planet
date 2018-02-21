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
      const planets = results[0];

     res.json(planets);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

// express will serve up index.html if it doesn't recognize the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));