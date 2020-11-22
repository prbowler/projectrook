const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const getCardsRouter = require('./routes/getcards');
const showHandRouter = require('./routes/showHand');


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set the routers
//app.get('/', (req, res) => res.render('pages/index'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getcards', getCardsRouter);
app.use('/showHand', showHandRouter);

//Listen on port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
