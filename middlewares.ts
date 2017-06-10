var morgan = require('morgan')
   ,mongoose = require('mongoose')
   ,compression = require('compression')
   ,bodyParser = require('body-parser')
   ,helmet = require('helmet')
   , errorHandler = require('errorhandler')
   , methodOverride = require('method-override')
   , expressPaginate = require('express-paginate')
   ,cors = require('cors');

import {logger} from './libs/logger';
import * as express from 'express';

module.exports = app => {
  app.set("port", 3000);
  app.set("json spaces", 4);
  app.use(morgan("common", {
    stream: {
      write: (message) => {
        logger.info(message);
      }
    }
  }));
  app.use(helmet());
  app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  app.use(compression());
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  app.use(methodOverride());
  app.use(expressPaginate.middleware(10,100)); 
  app.use(bodyParser.json());
  app.use(express.static("public"));
  if ('development' == app.get('env')) {
    app.use(errorHandler());
  }
};