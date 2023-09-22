// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/index.js');

const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/comments/:id', (req, res) => {
  db.getComments(req.params.id, (err, data) => {
    if (err) {
      console.log('Error getting comments from DB: ', err);
      res.status(500).send();
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/api/comments', (req, res) => {
  db.postComment(req.body, (err, data) => {
    if (err) {
      console.log('Error posting comment to DB: ', err);
      res.status(500).send();
    } else {
      res.status(201).send(data);
    }
  });
});

app.put('/api/comments/:id', (req, res) => {
  db.updateComment(req.params.id, req.body, (err, data) => {
    if (err) {
      console.log('Error updating comment in DB: ', err);
      res.status(500).send();
    } else {
      res.status(202).send(data);
    }
  });
});

app.delete('/api/comments/:id', (req, res) => {
  db.deleteComment(req.params.id, (err, data) => {
    if (err) {
      console.log('Error deleting comment from DB: ', err);
      res.status(500).send();
    } else {
      res.status(202).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});