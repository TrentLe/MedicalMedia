const express = require('express');
const mongodb = require('mongodb').MongoClient;
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

const connectionString = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${activity}`;

let db;

mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  db = client.db();
  app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('create', function(req, res) {
    db.collection('posts').insertOne(
        req.body, function(err, info) {
        res.json(info);
    });
});