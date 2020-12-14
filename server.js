const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
let session = require('express-session');
let FileStore = require('session-file-store')(session);

const mainRouter = require('./routes/main');
const playerRouter = require('./routes/players');
const cardRouter = require('./routes/cards');
const gameRouter = require('./routes/games');
const handRouter = require('./routes/hands');
const bidRouter = require('./routes/bids');
const roundRouter = require('./routes/rounds');
const scoreRouter = require('./routes/scores');
const teamRouter = require('./routes/teams');
const trickRouter = require('./routes/tricks');

//logger middleware morgan
app.use(require('morgan')('dev'));

//session info
app.use(session({
    name: 'server-session-cookie-id',
    secret: 'rook is fun',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

//test of requests
app.use(function(req, res, next) {
    if (req.session) {
        console.log("user", req.session);
    }
    next();
});

//static public path
app.use(express.static(path.join(__dirname, 'public')));

// support json encoded bodies
app.use(express.json());

// support url encoded bodies
app.use(express.urlencoded({extended: true}));

//set paths
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Set the routers
app.use('/', mainRouter);
app.use('/players', playerRouter);
app.use('/cards', cardRouter);
app.use('/games', gameRouter);
app.use('/hands', handRouter);
app.use('/bids', bidRouter);
app.use('/rounds', roundRouter);
app.use('/scores', scoreRouter);
app.use('/teams', teamRouter);
app.use('/tricks', trickRouter);

//Server Sent Events  https://medium.com/@moinism/using-nodejs-for-uni-directional-event-streaming-sse-c80538e6e82e
app.get('/sse-server', function (req, res) {
   res.status(200).set({
       "connnection": "keep-alive",
       "cache-control": "no-cache",
       "content-Type": "text/event-stream"
   });
    const data = {
       message: "update"
    };
    setInterval(() => {
        data.timestamp = Date.now();
        res.write('data: update\n\n')
    }, 5000)
});

//Listen on port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
