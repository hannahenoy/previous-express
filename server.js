const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
app.use('/public', express.static('public'));


var db;

const url = "mongodb+srv://hannahenoy:JT7rvwRgT8rZCQyC@cluster0.mfse9bk.mongodb.net/?retryWrites=true&w=majority"
const dbName = 'palindrome'

app.listen(2000, function () {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    });

});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('palindrome')
  .find()
  .toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { palindrome: result })
  })

})

app.post('/userWord', (req, res) => {
  let word = `${req.body.word}`
  let findPalindrome = word.toLowerCase().split('').reverse().join('')

  if (word.toLowerCase() === findPalindrome) {
    palindromeResult = 'is a palindrome';
  } else {
    palindromeResult = 'can not be spelled the same backwards'
  }

  db.collection('palindrome').insertOne(
    {
      word: req.body.word,
      outcome: palindromeResult
    })
    .then(result => {
      console.log('saved to database')
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteWord', (req, res) => {
  db.collection('palindrome').findOneAndDelete(
    {
      word: req.body.word
    },
    (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
  })
})