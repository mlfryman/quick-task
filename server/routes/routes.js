'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    priorities     = require('../controllers/priorities'),
    tasks          = require('../controllers/tasks'),
    home           = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(debug.info);

  app.get('/home', home.index);
  // Node receives POST from Angular, which creates the priority & saves to DB
  app.post('/priorities', priorities.create);
  app.get('/priorities', priorities.index);
  app.post('/tasks', tasks.create);
  app.get('/tasks', tasks.index);

  console.log('Express: Routes Loaded');
};

