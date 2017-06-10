import * as express from 'express';
import * as consign from 'consign';

export const app = express();
consign('libs/config.js')
.include('models')
.into(app);
console.log(app.libs.config);