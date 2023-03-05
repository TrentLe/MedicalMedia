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

app.post('/create', function(req, res) {
    db.collection('posts').insertOne(
        req.body, function(err, info) {
        res.json(info);
    });
});

// Find all posts
app.get('/posts', function(req, res) {
    db.collection('posts').find().toArray(function(err, results) {
        res.json(results);
    });
});

// Find one post
app.get('/posts/:id', function(req, res) {
    db.collection('posts').findOne({ _id: new mongodb.ObjectID(req.params.id) }, function(err, result) {
        res.json(result);
    });
})

// Update one post
app.put('/posts/:id', function(req, res) {
    db.collection('posts').updateOne({ _id: new mongodb.ObjectID(req.params.id) }, { $set: { title: req.body.title, content: req.body.content } }, function(err, info) {
        res.json(info);
    });
});


// Delete one post
app.delete('/posts/:id', function(req, res) {
    db.collection('posts').deleteOne({ _id: new mongodb.ObjectID(req.params.id) }, function(err, info) {
        res.json(info);
    });

});

// Delete all posts
app.delete('/posts', function(req, res) {
    db.collection('posts').deleteMany({}, function(err, info) {
        res.json(info);
    });
});



// app.use(routes);



