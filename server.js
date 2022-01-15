const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res, next) => {
  const randQuote = getRandomElement(quotes);
  if(randQuote){
      res.status(200).send({quote: randQuote})
  } else {
      res.status(401).send();
  }
})

app.get('/api/quotes', (req, res, next) => {
    const query = req.query.person;
    if (!query) {
        res.send({quotes})
    } else {
        const quoteList = [];
        for (i = 0; i < quotes.length; i++) {
            if (quotes[i].person == query) {
                quoteList.push(quotes[i])
            }
        }
        res.send({quotes: quoteList})
    }
})

app.post('/api/quotes', (req, res, next) => {
    const quoteBody = req.query.quote;
    const quotePerson = req.query.person;
    if (!quoteBody || !quotePerson) {
        res.status(400).send();
    } else {
        quotes.push({quote: quoteBody, person: quotePerson});
        const newQuote = quotes.length-1;
        res.send({quote: quotes[newQuote]});
    }
})

app.listen(PORT,() => {
  console.log(`Server up and running on ${PORT}`)
})
