const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// create quotes router
const quotesRouter = express.Router();
app.use("/api/quotes", quotesRouter);

// get random quote
quotesRouter.get('/random', (req, res) => {
    res.send({ quote: getRandomElement(quotes) });
});

// get all quotes
quotesRouter.get('/', (req,res) => {
    const person = req.query.person;
    if (person) {
        const personArray = quotes.filter(quote => {
            return quote.person === person;
        });
        res.send({ quotes: personArray });
    } else {
        res.send({ quotes: quotes });
    }
    res.status(404).send();
});

// create a new quote
quotesRouter.post('/', (req, res) => {
    const quote = req.query.quote;
    const person = req.query.person;
    if (quote && person) {
        const quoteObect = {
            quote: `${quote}`,
            person: `${person}`
        }
        quotes.push(quoteObect);
        res.send({ quote: quoteObect });
    } 
    res.status(400).send();
});

app.listen(PORT);